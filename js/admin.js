import backendAPI from "../api/api.js";

const emailInput = document.querySelector(".emailInput");
const subscriptionInput = document.querySelector(".subscriptionInput");
const transactionInput = document.querySelector(".transactionInput");
const amountInput = document.querySelector(".amountInput");
const deductedAmountInput = document.querySelector(".deductedAmountInput");
const form = document.querySelector(".adminForm");
const spinner = document.querySelector(".spinner");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = {
    email: emailInput.value,
    subscription: subscriptionInput.value,
    transaction: transactionInput.value,
    amount: amountInput.value,
    deductedAmount: deductedAmountInput.value,
  };
  try {
    spinner.style.display = "block";
    const response = await axios.post(`${backendAPI}/updateUser`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    const { message, success } = response.data;
    if (success) {
      $(function () {
        toastr.success(message);
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    spinner.style.display = "none";
  }
});
