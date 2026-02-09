const loginPage = "login.html";

const getStartedBtn = document.querySelector(".mp-btn");
const loginLink = document.querySelector(".mp-login-link");

if (getStartedBtn) {
  getStartedBtn.addEventListener("click", () => {
    console.log("Get started clicked → navigating to login page");
    window.location.href = loginPage;
  });
}

if (loginLink) {
  loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Login clicked → navigating to login page");
    window.location.href = loginPage;
  });
}
