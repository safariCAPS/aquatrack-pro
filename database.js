import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://tecenaxizjatwjgkgslt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlY2VuYXhpemphdHdqZ2tnc2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NTA0MjksImV4cCI6MjA1NjMyNjQyOX0.C5aPf3iv5UouM8-VN9HrE5ClM1tredCOyV7T00AGj8g'
);
// Submit Report
document.getElementById('reportForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const reportData = {
    location_name: document.getElementById('locationName').value,
    block: document.getElementById('block').value,
    issue_type: document.getElementById('issueType').value,
    plumber_name: document.getElementById('plumberName').value,
    coordinates: document.getElementById('locationName').value, // Contains coordinates from map
    status: "Pending"
  };

  // Upload photo
  const photoFile = document.getElementById('photo').files[0];
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('photos')
    .upload(`report_${Date.now()}`, photoFile);

  if (uploadError) {
    alert(uploadError.message);
    return;
  }

  reportData.photo_url = `${supabase.storage.url}/object/public/photos/${uploadData.path}`;

  // Save to database
  const { data, error } = await supabase
    .from('reports')
    .insert([reportData]);

  if (error) {
    alert(error.message);
  } else {
    alert('Report submitted!');
    window.location.href = 'dashboard.html';
  }
});

// Real-time updates
if (document.getElementById('issuesList')) {
  supabase
    .channel('reports')
    .on('postgres_changes', { event: '*', schema: 'public' }, (payload) => {
      const issuesList = document.getElementById('issuesList');
      const newItem = document.createElement('div');
      newItem.className = 'issue-card';
      newItem.innerHTML = `
        <h3>${payload.new.location_name} (Block ${payload.new.block})</h3>
        <p>Type: ${payload.new.issue_type} | Status: ${payload.new.status}</p>
      `;
      issuesList.prepend(newItem);
    })
    .subscribe();

  // CSV Export
  document.getElementById('exportCSV').addEventListener('click', async () => {
    const { data: reports, error } = await supabase
      .from('reports')
      .select('*');
    
    if (error) {
      alert(error.message);
      return;
    }

    const csv = Papa.unparse(reports.map(report => ({
      "Location Name": report.location_name,
      "Block": report.block,
      "Coordinates": report.coordinates,
      "Issue Type": report.issue_type,
      "Plumber": report.plumber_name,
      "Status": report.status,
      "Report Time": report.created_at,
      "Feedback Time": report.updated_at
    })));
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reports.csv';
    a.click();
  });
}
