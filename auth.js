const supabase = createClient(
  'https://tecenaxizjatwjgkgslt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlY2VuYXhpemphdHdqZ2tnc2x0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NTA0MjksImV4cCI6MjA1NjMyNjQyOX0.C5aPf3iv5UouM8-VN9HrE5ClM1tredCOyV7T00AGj8g'
);

// Login
document.getElementById('authForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    window.location.href = 'dashboard.html';
  } catch (error) {
    alert(error.message);
  }
});

// Signup
document.getElementById('signupBtn').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    alert('Check your email for verification!');
  } catch (error) {
    alert(error.message);
  }
});
