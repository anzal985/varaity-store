// Login Form Handling
document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Fetch users from localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Check if user exists and password matches
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Set logged-in user in localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    alert('Login successful!');
    window.location.href = '/';  // Redirect to home or dashboard
  } else {
    alert('Invalid username or password!');
  }
});

// Registration Form Handling
document.getElementById('register-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.getElementById('new-username').value;
  const password = document.getElementById('new-password').value;

  // Fetch existing users from localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Check if username already exists
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    alert('Username already exists! Please choose a different username.');
    return;
  }

  // Save new user to localStorage
  users.push({ username, password });
  localStorage.setItem('users', JSON.stringify(users));

  alert('Registration successful! You can now log in.');
  window.location.href = '#login';  // Redirect to login page after registration
});

// Check if user is logged in
function checkLoginStatus() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  if (loggedInUser) {
    document.getElementById('login').style.display = 'none';  // Hide login/register
    document.getElementById('logout').style.display = 'block'; // Show logout option
  } else {
    document.getElementById('login').style.display = 'block'; // Show login/register
    document.getElementById('logout').style.display = 'none'; // Hide logout option
  }
}

// Logout functionality
document.getElementById('logout').addEventListener('click', function () {
  localStorage.removeItem('loggedInUser');
  alert('You have been logged out.');
  window.location.href = '/'; // Redirect to home page
});

// Run checkLoginStatus when the page loads
window.onload = checkLoginStatus;
