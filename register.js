const cards = document.querySelectorAll(".card");
const steps = document.querySelectorAll(".step");
const continueButtons = document.querySelectorAll(".continue");
const backButtons = document.querySelectorAll(".back-link");

// STEP 1
const phoneInput = document.querySelector(".phone-input");
const phoneError = document.getElementById("phoneError");

// STEP 2
const consentCheckboxes = document.querySelectorAll(
  ".checkbox-group input[type='checkbox']"
);

// STEP 3
const otpInputs = document.querySelectorAll(".otp-row input");

// STEP 4
const emailInput = document.querySelector(".email-input");

// STEP 5
const passcodeInput = document.querySelector(".passcode-input");

let currentStep = 0;

// STORE DATA
const formData = {
  phone: "",
  consent: false,
  otp: "",
  email: "",
  passcode: ""
};

/* =========================
   STEP DISPLAY
========================= */
function showStep(index) {
  cards.forEach(card => (card.style.display = "none"));
  steps.forEach(step => step.classList.remove("active"));

  cards[index].style.display = "block";
  steps[index].classList.add("active");

  currentStep = index;
}

/* =========================
   MARK STEP COMPLETE
========================= */
function completeStep(index) {
  steps[index].classList.remove("active");
  steps[index].classList.add("completed");
}

/* =========================
   STEP VALIDATION
========================= */
function isStepValid(stepIndex) {
  switch (stepIndex) {
    case 0: // PHONE
      return phoneInput && isValidNigerianNumber(phoneInput.value);

    case 1: // CONSENT
      return Array.from(consentCheckboxes)
        .slice(0, 2)
        .some(cb => cb.checked);

    case 2: // OTP
      return Array.from(otpInputs).every(input => input.value !== "");

    case 3: // EMAIL
      return emailInput && emailInput.value.trim() !== "";

    case 4: // PASSCODE
      return passcodeInput && passcodeInput.value.trim() !== "";

    default:
      return false;
  }
}

/* =========================
   PHONE – NUMERIC ONLY
========================= */
phoneInput?.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/\D/g, "");
  formData.phone = phoneInput.value;
});

/* =========================
   NIGERIAN PHONE CHECK
========================= */
function isValidNigerianNumber(value) {
  const phone = value.replace(/\D/g, "");
  return /^0[789][01]\d{8}$/.test(phone) || /^234[789][01]\d{8}$/.test(phone);
}

/* =========================
   OTP INPUT LOGIC
========================= */
function checkOtp() {
  formData.otp = Array.from(otpInputs).map(i => i.value).join("");
}

otpInputs.forEach((input, index) => {
  input.addEventListener("input", e => {
    e.target.value = e.target.value.replace(/\D/g, "");
    if (e.target.value && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus();
    }
    checkOtp();
  });

  input.addEventListener("keydown", e => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpInputs[index - 1].focus();
    }
  });

  input.addEventListener("paste", e => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").replace(/\D/g, "");
    data.split("").forEach((char, i) => {
      if (otpInputs[i]) otpInputs[i].value = char;
    });
    checkOtp();
  });
});

/* =========================
   PASSCODE – NUMERIC ONLY
========================= */
passcodeInput?.addEventListener("input", () => {
  passcodeInput.value = passcodeInput.value.replace(/\D/g, "");
  formData.passcode = passcodeInput.value;
});

/* =========================
   CONTINUE BUTTON
========================= */
continueButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (!isStepValid(currentStep)) {
      return; // 🚫 STOP IF STEP NOT COMPLETE
    }

    completeStep(currentStep);

    if (currentStep < cards.length - 1) {
      showStep(currentStep + 1);
    }
  });
});

/* =========================
   BACK BUTTON
========================= */
backButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentStep > 0) {
      showStep(currentStep - 1);
    }
  });
});

/* =========================
   INIT
========================= */
showStep(0);





function completeStep(index) {
  const step = steps[index];

  // remove active
  step.classList.remove("active");

  // add completed flag
  step.classList.add("completed");

  // change the circle (pseudo replacement using span)
  if (!step.dataset.completed) {
    step.innerHTML = step.innerHTML.replace(
      "STEP",
      "✔ STEP"
    );
    step.style.color = "#16a34a"; // green text
    step.dataset.completed = "true";
  }
}
