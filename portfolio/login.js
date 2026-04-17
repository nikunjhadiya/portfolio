// 🔐 AUTO REDIRECT IF ALREADY LOGGED IN
if (sessionStorage.getItem("auth") === "true") {
  window.location.replace("./dashboard/dashboard.html");
}

// PASSWORD VALIDATION
function validatePassword(pass) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return regex.test(pass);
}

// LOGIN FUNCTION
function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const error = document.getElementById("error");
  const btn = document.getElementById("loginBtn");

  error.innerText = "";

  if (!user || !pass) {
    error.innerText = "All fields are required.";
    return;
  }

  if (!validatePassword(pass)) {
    error.innerText = "Password must be 6+ chars with letters & numbers.";
    return;
  }

  btn.innerText = "Logging in...";
  btn.disabled = true;

  setTimeout(() => {
    if (user === "nikunj" && pass === "Nikunjdev66") {
      sessionStorage.setItem("auth", "true");
      window.location.replace("./dashboard/dashboard.html");
    } else {
      error.innerText = "Username or password is incorrect.";
    }

    btn.innerText = "Login";
    btn.disabled = false;
  }, 800);
}

// PASSWORD TOGGLE
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("togglePassword");
  const password = document.getElementById("password");

  toggle.addEventListener("click", () => {
    const isHidden = password.type === "password";
    password.type = isHidden ? "text" : "password";

    toggle.classList.toggle("fa-eye");
    toggle.classList.toggle("fa-eye-slash");
  });
});
