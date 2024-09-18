import backendAPI from "../api/api.js";
import getUser from "./getUser.js";
import frontendUrl from "../api/frontend.js";

const user = await getUser(backendAPI, frontendUrl);

const subscribeButton = document.querySelectorAll(".subscribe_button");
const modal = document.querySelector(".modal");
const modalInput = document.querySelector(".subscription-modal input");
const closeButton = document.querySelector(".close_button");
const modalHeader = document.querySelector(".subscription_modal__header");
const errorMessage = document.querySelector(".subscription_error_span");
const paymentStatement = document.querySelector(
  ".subscription_modal_statement"
);
const confirmButton = document.querySelector(".confirm_button");
const spinner = document.querySelector(".spinner");

subscribeButton.forEach((button) => {
  button.addEventListener("click", () => {
    modalInput.value = "";
    paymentStatement.innerText = "";
    let plan = button.getAttribute("data-plan");
    if (modalInput.value.trim() == "") {
      errorMessage.style.display = "none";
    }
    console.log("plan:", plan);
    if (plan == "Basic") {
      modalHeader.innerText = "Basic Plan";
      errorChecker(plan, 100, 9999);
    } else if (plan == "Pro") {
      modalHeader.innerText = "Pro Plan";
      errorChecker(plan, 10000, 49999);
    } else if (plan == "Premium") {
      modalHeader.innerText = "Premium Plan";
      errorChecker(plan, 50000, 99999);
    } else if (plan == "Ultimate") {
      modalHeader.innerText = "Ultimate Plan";
      errorChecker(plan, 100000, 99999999);
    }
    modal.classList.add("show");
    document.body.style.overflowY = "hidden";
    document.body.style.height = "100vh";
  });
});

closeButton.addEventListener("click", () => {
  modal.classList.remove("show");
  document.body.style.overflowY = "scroll";
  document.body.style.height = "100vh";
});
window.addEventListener("click", (event) => {
  if (event.target.className == "modal show") {
    modal.classList.remove("show");
    document.body.style.overflowY = "scroll";
    document.body.style.height = "100vh";
  }
});

confirmButton.addEventListener("click", () => {
  spinner.style.display = "block";
  confirmSubscription();
  setTimeout(() => {
    spinner.style.display = "none";
    $(function () {
      toastr.info("Processing Payment");
      modal.classList.remove("show");
      document.body.style.overflowY = "scroll";
      document.body.style.height = "100vh";
    });
  }, 2000);
});

function errorChecker(plan, id_1, id_2) {
  modalInput.addEventListener("input", () => {
    let amount = modalInput.value;
    console.log(amount);
    if (amount < id_1 || amount > id_2) {
      console.log("amount value is not appropriate");
      errorMessage.style.display = "block";
      errorMessage.innerText = `${plan} plan subscription must be between $${id_1} - $${id_2}`;
      paymentStatement.innerText = "";
      console.log("payment statement:", paymentStatement.innerText);
    } else {
      errorMessage.style.display = "none";
      convertCurrency(amount);
      console.log("amount value is appropriate");
    }
  });
}

async function convertCurrency(amount) {
  const fromCurrency = "usd";
  const toCurrency = "bitcoin";
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: toCurrency.toLowerCase(),
          vs_currencies: fromCurrency.toLowerCase(),
        },
      }
    );
    console.log("response:", response.data);
    const conversionRate =
      response.data[toCurrency.toLowerCase()][fromCurrency];

    const convertedAmount = (amount / conversionRate).toFixed(4);
    paymentStatement.innerText = `You have requested to pay $${amount} for this plan. Please pay ${convertedAmount}bitcoin to the wallet address below for a successful payment. `;
  } catch (err) {
    console.log(err);
  }
}

async function confirmSubscription() {
  try {
    const formData = {
      plan: modalHeader.innerText,
      email: user.email,
      amount: modalInput.value,
    };
    const response = await axios.post(
      `${backendAPI}/confirmSubscription`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("response:", response.data.message);
  } catch (err) {
    console.log(err);
  }
}
