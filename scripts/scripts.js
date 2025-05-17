
document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".dropdown > a");

  dropdowns.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      // Prevent navigation
      e.preventDefault();

      // Close other open menus
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        if (menu !== this.nextElementSibling) menu.style.display = "none";
      });

      // Toggle the current one
      const submenu = this.nextElementSibling;
      submenu.classList.toggle("show");

    });
  });
});

function showLogin() {
  document.getElementById('loginModal').style.display = 'block';
  document.getElementById('signupModal').style.display = 'none';
}

function showSignup() {
  document.getElementById('signupModal').style.display = 'block';
  document.getElementById('loginModal').style.display = 'none';
}

function closeModals() {
  document.getElementById('loginModal').style.display = 'none';
  document.getElementById('signupModal').style.display = 'none';
}

function loginUser() {
  const email = document.querySelector('#loginModal input[type="text"]').value;
  const password = document.querySelector('#loginModal input[type="password"]').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Logged in as: " + userCredential.user.email);
      closeModals();
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
}

function registerUser() {
  const name = document.querySelector('#signupModal input[placeholder="Full Name"]').value;
  const email = document.querySelector('#signupModal input[placeholder="Email"]').value;
  const password = document.querySelector('#signupModal input[placeholder="Password"]').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      return userCredential.user.updateProfile({ displayName: name });
    })
    .then(() => {
      alert("Registration successful. Welcome!");
      closeModals();
    })
    .catch((error) => {
      alert("Signup failed: " + error.message);
    });
}

function logout() {
  auth.signOut()
    .then(() => {
      alert("You have been logged out.");
      location.reload();
    })
    .catch((error) => {
      alert("Logout failed: " + error.message);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, user => {
      const authLinks = document.querySelector(".auth-links");
      if (!authLinks) return;
  
      if (user) {
        authLinks.innerHTML = `
          <span style="color:#febd69; font-weight:600;">Hello, ${user.displayName || user.email}</span>
          <button onclick="logout()" style="margin-left: 10px; padding: 6px 12px; background-color: #febd69; border: none; color: #131921; font-weight: bold; cursor: pointer;">Logout</button>
        `;
      }
    });
  });
  



function toggleNav() {
  const nav = document.getElementById("mainNav");
  nav.classList.toggle("active");
}

function toggleDropdown(event) {
  event.preventDefault();
  const dropdown = event.target.closest(".dropdown");
  dropdown.classList.toggle("open");
}

function toggleSubDropdown(event) {
  event.preventDefault();
  const subDropdown = event.target.closest(".sub-dropdown");
  subDropdown.classList.toggle("open");
}

document.addEventListener("click", function (e) {
  if (!e.target.closest("header")) {
    document.getElementById("mainNav").classList.remove("active");
    document.querySelectorAll(".dropdown, .sub-dropdown").forEach(el => el.classList.remove("open"));
  }
});
