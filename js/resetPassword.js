import backendAPI from "../api/api.js";
import frontendUrl from "../api/frontend.js";

const password = document.querySelector(".resetPasswordInput");
const resetForm = document.querySelector(".verifyForm");
const spinner = document.querySelector(".spinner");
const spinnerButton = document.querySelector(".spinner_button_div");
const passwordError = document.querySelector(".password_error");

resetForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  spinner.style.display = "block";
  spinnerButton.disabled = true;
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  console.log("token:", token);
  const formData = {
    password: password.value,
    token,
  };

  try {
    const response = await axios.post(`${backendAPI}/resetPassword`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(response.data);
    const { message, success } = response.data;
    if (success) {
      $(function () {
        toastr.success(message);
      });
      setTimeout(() => {
        window.location.href = `${frontendUrl}/login.html`;
      }, 1000);
    }
  } catch (err) {
    toastr.error("Invalid or expired token");
  } finally {
    spinner.style.display = "none";
    spinnerButton.disabled = false;
  }
});

function passwordChecker(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  if (hasUpperCase && hasLowerCase && hasNumber) {
    passwordError.style.display = "none";
    spinnerButton.disabled = false;
  } else {
    passwordError.style.display = "block";

    spinnerButton.disabled = true;
    return;
  }
}

password.addEventListener("input", () => {
  passwordChecker(password.value);
});
