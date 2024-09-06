import backendAPI from "../api/api.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const form = document.querySelector(".loginForm");
const spinner = document.querySelector(".spinner");
const spinnerButton = document.querySelector(".spinner_button_div");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  spinner.style.display = "block";
  spinnerButton.disabled = true;

  const formData = {
    email: email.value,
    password: password.value,
  };
  try {
    const response = await axios.post(`${backendAPI}/signin`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(response.data);
    const { message, success } = response.data;
    console.log("message:", message);
    console.log("success:", success);
    if (success) {
      $(function () {
        toastr.success(`${message}`);
      });
      setTimeout(() => {
        window.location.href = "../dashboard.html";
      }, 1000);
    }
    if (!success) {
      $(function () {
        toastr.error(`${message}`);
      });
    }
  } catch (err) {
    $(function () {
      toastr.error(
        "User credentials does not exist. Kindly go to the register page."
      );
    });
    console.log(err);
  } finally {
    spinner.style.display = "none";
    spinnerButton.disabled = false;
  }
});
