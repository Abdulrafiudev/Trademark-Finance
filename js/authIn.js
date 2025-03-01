import backendAPI from "../api/api.js";
import frontendUrl from "../api/frontend.js";

console.log("backend API:", backendAPI);

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
    spinner.style.display = "none";
    spinnerButton.disabled = false;
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
    const { success, token, user } = response.data;
    console.log("token:", token);
    console.log("success:", success);
    console.log("user:", user);

    localStorage.setItem("authToken", token);

    if (success) {
      $(function () {
        toastr.success("Login Successful");
      });
      setTimeout(() => {
        window.location.href = `${frontendUrl}/dashboard.html`;
      }, 1000);
    }
    if (!success) {
      $(function () {
        toastr.error(`Password is not a match.`);
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
