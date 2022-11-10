let btnLogin = document.getElementById("btnLogin")

let userName = document.getElementById("userName");
let emailUser = document.getElementById("emailUser");
let passUser = document.getElementById("passUser");

let loginForm = document.getElementById("loginForm");
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  
  userName.classList.remove('is-invalid');
  if (userName.value === "") {
    userName.classList.add('is-invalid'); 
  }

  emailUser.classList.remove('is-invalid');
  if (emailUser.value === "") {
    emailUser.classList.add('is-invalid');
  }

  passUser.classList.remove('is-invalid');
  if (passUser.value === "") {
    passUser.classList.add('is-invalid');
  }

  if ((userName.value) && (emailUser.value) && (passUser.value)) {
    window.location.href = "home.html"
    localStorage.setItem("user", userName.value)
    localStorage.setItem("email", emailUser.value)
  }
})

