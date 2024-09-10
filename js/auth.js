import backendAPI from "../api/api.js";

const username = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const spinner = document.querySelector(".spinner");
const spinnerButton = document.querySelector(".spinner_button_div");

const form = document.querySelector("#registerForm");
console.log(form);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  spinner.style.display = "block";
  spinnerButton.disabled = true;

  const formData = {
    username: username.value,
    email: email.value,
    password: password.value,
  };
  try {
    const response = await axios.post(`${backendAPI}/signup`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(response.data);

    const { message, success, users } = response.data;

    if (success) {
      $(function () {
        toastr.success(message);
      });

      setTimeout(() => {
        window.location.href = "../verifyOtp.html";
      }, 1000);
    }
  } catch (err) {
    $(function () {
      toastr.error("User Email already exist");
    });
    console.log(err);
  } finally {
    spinner.style.display = "none";
    spinnerButton.disabled = false;
  }
});
