const supabase = createClient(
  'https://tecenaxizjatwjgkgslt.supabase.co',
  'YOUR_SUPABASE_ANON_KEY'
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
