// ===============================
// ELEMENTS
// ===============================
const phoneTab = document.getElementById("phoneTab");
const usernameTab = document.getElementById("usernameTab");

const phoneForm = document.querySelector(".phone-form");
const usernameForm = document.querySelector(".username-form");

const phoneInput = document.getElementById("phoneInput");
const usernameInput = document.getElementById("usernameInput");

const nextButtons = document.querySelectorAll(".next-btn");

const modal = document.getElementById("limitModal");
const closeModal = document.getElementById("closeModal");

let attempts = 0;

// ===============================
// STRICT NUMERIC INPUT ONLY
// ===============================
phoneInput.addEventListener("keydown", (e) => {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "Tab",
    "ArrowLeft",
    "ArrowRight",
    "Home",
    "End"
  ];

  if (allowedKeys.includes(e.key)) return;

  // Block everything except digits
  if (!/^[0-9]$/.test(e.key)) {
    e.preventDefault();
  }
});

// Clean pasted / injected text
phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/\D/g, "");
});

// ===============================
// TOGGLE FORMS
// ===============================
phoneTab.addEventListener("click", () => {
  phoneTab.classList.add("active");
  usernameTab.classList.remove("active");

  phoneForm.classList.add("active");
  usernameForm.classList.remove("active");
});

usernameTab.addEventListener("click", () => {
  usernameTab.classList.add("active");
  phoneTab.classList.remove("active");

  usernameForm.classList.add("active");
  phoneForm.classList.remove("active");
});

// ===============================
// ENABLE NEXT BUTTON WHEN INPUT FILLED
// ===============================
document.addEventListener("input", () => {
  const activeForm = document.querySelector(".form.active");
  if (!activeForm) return;

  const input = activeForm.querySelector("input");
  const btn = activeForm.querySelector(".next-btn");

  if (input && btn) {
    if (input.value.trim() !== "") {
      btn.classList.add("enabled");
      btn.disabled = false;
    } else {
      btn.classList.remove("enabled");
      btn.disabled = true;
    }
  }
});

// ===============================
// SUBMIT + ATTEMPT LIMIT
// ===============================
nextButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    attempts++;
    if (attempts >= 3) {
      modal.style.display = "flex";
    }
  });
});

// ===============================
// CLOSE MODAL
// ===============================
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  attempts = 0;
});
