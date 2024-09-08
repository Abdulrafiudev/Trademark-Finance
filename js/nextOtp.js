import backendAPI from "../api/api.js";

const otpInputs = document.querySelectorAll(".otp_form_div input");
const otpForm = document.querySelector(".verifyForm");
const spinner = document.querySelector(".spinner");
const spinnerButton = document.querySelector(".spinner_button_div");

otpInputs.forEach((input) => {
  input.value = "";
});

otpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  spinner.style.display = "block";
  spinnerButton.disabled = true;

  const otp1 = document.querySelector("#otp1").value;
  const otp2 = document.querySelector("#otp2").value;
  const otp3 = document.querySelector("#otp3").value;
  const otp4 = document.querySelector("#otp4").value;
  const otp5 = document.querySelector("#otp5").value;
  const otp6 = document.querySelector("#otp6").value;
  const fullOtp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
  try {
    const response = await axios.post(
      `${backendAPI}/verifyOtp`,
      { fullOtp },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(response.data);
    const { message, success } = response.data;
    if (success) {
      $(function () {
        toastr.success(message);
      });
      setTimeout(() => {
        window.location.href = "../dashboard.html";
      }, 1000);
    } else {
      $(function () {
        toastr.error(message);
      });
      // setTimeout(() => {
      //   window.location.href = "../register.html";
      // }, 1000);
    }
  } catch (err) {
    console.log(err);
    $(function () {
      toastr.error("Server Error");
    });
  } finally {
    spinner.style.display = "none";
    spinnerButton.disabled = false;
  }
});
