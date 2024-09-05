import backendAPI from "../api/api.js";

const username = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const form = document.querySelector("#registerForm");
console.log(form);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

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
    });
    console.log(response.data);
    username.value = "";
    email.value = "";
    password.value = "";
    const { message, success, users } = response.data;

    if (success) {
      $(function () {
        toastr.success("User Registerd successfully.");
      });

      setTimeout(() => {
        window.location.href = "../dashboard.html";
      }, 1000);
    }
  } catch (err) {
    $(function () {
      toastr.error("User Email already exist");
    });
    console.log(err);
  }
});
