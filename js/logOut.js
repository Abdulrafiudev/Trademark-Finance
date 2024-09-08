import backendAPI from "../api/api.js";

const logoutButton = document.querySelector(".logout_button");

logoutButton.addEventListener("click", async () => {
  try {
    const response = await axios.get(`${backendAPI}/logout`, {
      withCredentials: true,
    });
    const { message, success } = response.data;
    if (success) {
      $(function () {
        toastr.success(message);
      });
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1000);
    }
  } catch (err) {
    $(function () {
      toastr.error(" Failed to Logout.");
    });
  }
});
