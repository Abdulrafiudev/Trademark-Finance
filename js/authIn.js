import backendAPI from "../api/api.js";
import frontendUrl from "../api/frontend.js";

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
  if (
    email.value == "trademarkfinance.co@gmail.com" &&
    password.value == "admin"
  ) {
    $(function () {
      toastr.success("Admin login successful");
    });
    setTimeout(() => {
      window.location.href = `${frontendUrl}/admin.html`;
    }, 1000);
    return;
  }
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
        window.location.href = `${frontendUrl}/dashboard.html`;
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
