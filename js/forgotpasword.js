import backendAPI from "../api/api.js";

const email = document.querySelector(".forgotemail");
const forgotForm = document.querySelector(".verifyForm");
const spinner = document.querySelector(".spinner");
const spinnerButton = document.querySelector(".spinner_button_div");

forgotForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  spinner.style.display = "block";
  spinnerButton.disabled = true;
  const formData = {
    email: email.value,
  };
  try {
    const response = await axios.post(
      `${backendAPI}/forgotPassword`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    const { message, success } = response.data;
    if (success) {
      $(function () {
        toastr.success(message);
      });
    }
  } catch (err) {
    $(function () {
      toastr.error("User not found");
    });
  } finally {
    spinner.style.display = "none";
    spinnerButton.disabled = false;
  }
});
