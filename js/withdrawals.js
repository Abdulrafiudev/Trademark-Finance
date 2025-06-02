import backendAPI from "../api/api.js";
import getUser from "./getUser.js";
import transactions from "./transaction.js";
// import { amount as availableAmount } from "./dashboard.js";

const user = await getUser(backendAPI);
const userEmail = user.email;

const withdrawButton = document.querySelector(".withdrawal_submit");
const withdrawButtonInput = document.querySelector(".withdrawal_submit button");
const modal = document.querySelector(".withdrawal_modal1");
const passwordConfirmationModal = document.querySelector(
  ".confirmPassword_modal"
);
const confirmPasswordInput = document.querySelector(
  ".password_confirmation_input"
);
const closeButton = document.querySelector(".close_button");
const amount = document.querySelector(".amountwithdraw input");
const errorMessage = document.querySelector(".error_message");
const errorMessage1 = document.querySelector(".error_message1");
const errorMessage2 = document.querySelector(".error_message2");
const cryptoWallet = document.querySelector(".cryptoWallet");
const availableBalance = document.querySelector(".availableAmount");
const invalidAmountError = document.querySelector(".error_message4");
const selectedCurrency = document.querySelector(
  ".deposit_body_details_cont select"
);
const spinner = document.querySelector(".spinner");
const spinnerButton = document.querySelector(".spinner_button_div");
const confirmPasswordForm = document.querySelector(".confirmPassword_form");
const passwordErrorMessage = document.querySelector(".error_message3");
const passwordConfirmationModalContainer = document.querySelector(
  ".password_confirm_modal"
);

amount.value = "";

withdrawButtonInput.disabled = true;
if (withdrawButtonInput.disabled) {
  withdrawButtonInput.style.opacity = "0.5";
  withdrawButtonInput.style.cursor = "not-allowed";
}

if (user.balance == 0 || user.balance == null || user.balance == "null") {
  console.log("true:", true);
  withdrawButtonInput.disabled = true;
  availableBalance.innerText = `Avaliable Balance: $0.00`;
}

availableBalance.innerText = `Avaliable Balance: $${user.balance.toLocaleString(
  "en-US",
  {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
)}`;

function invalidAmountChecker() {
  if (amount.value > user.balance) {
    invalidAmountError.style.display = "block";
    withdrawButtonInput.disabled = true;
  } else {
    invalidAmountError.style.display = "none";
    withdrawButtonInput.disabled = false;
  }
}

amount.addEventListener("input", () => {
  if (amount.value.trim() == "") {
    errorMessage.style.display = "block";
    withdrawButtonInput.disabled = true;
  } else {
    errorMessage.style.display = "none";
    withdrawButtonInput.disabled = false;
    withdrawButtonInput.style.opacity = "1";
    withdrawButtonInput.style.cursor = "pointer";
  }
  invalidAmountChecker();
});
cryptoWallet.addEventListener("input", () => {
  if (cryptoWallet.value.trim() == "") {
    errorMessage1.style.display = "block";
    withdrawButtonInput.disabled = true;
  } else {
    errorMessage1.style.display = "none";
    withdrawButtonInput.disabled = false;
  }
});
selectedCurrency.addEventListener("input", () => {
  if (selectedCurrency.value.trim() == "null") {
    errorMessage2.style.display = "block";
    withdrawButtonInput.disabled = true;
  } else {
    errorMessage2.style.display = "none";
    withdrawButtonInput.disabled = false;
  }
});

withdrawButton.addEventListener("click", async () => {
  spinner.style.display = "block";
  spinnerButton.disabled = true;
  passwordConfirmationModal.classList.add("show");
});

closeButton.addEventListener("click", () => {
  // modal.classList.remove("show");
  passwordConfirmationModal.classList.remove("show");

  spinner.style.display = "none";
  spinnerButton.disabled = false;
  document.body.style.overflowY = "scroll";
  document.body.style.height = "100vh";
});

confirmPasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (confirmPasswordInput.value.trim() == user.password) {
    passwordConfirmationModal.classList.remove("show");
    // withdrawButton.click();

    passwordConfirmationModal.classList.remove("show");
    const formData = {
      token: selectedCurrency.value,
      wallet: cryptoWallet.value,
      amount: amount.value,
      email: user.email,
    };
    try {
      const response = await axios.post(
        `${backendAPI}/withdrawToken`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const { message, success } = response.data;
      console.log("response:", message);

      if (success) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const itemTransacted = {
          delete: '<a class="fa fa-trash icon-delete-product"></a>',
          trx: `tr-${Date.now()}`,
          transacted: `${year}-${month}-${day}`,
          amount: `$${amount.value} `,
          // statusbar: "🟡Pending",
          statusbar: "Withdrawal ⬅️",
        };
        transactions.push(itemTransacted);
        localStorage.setItem(
          `transaction_${userEmail}`,
          JSON.stringify(transactions)
        );
        modal.classList.add("show");
        document.body.style.overflowY = "hidden";
        document.body.style.height = "100vh";
        setTimeout(() => {
          window.location.href = "../transaction.html";
        }, 1500);
      }
    } catch (err) {
      console.log(err);
    } finally {
      spinner.style.display = "none";
      spinnerButton.disabled = false;
    }
  } else {
    console.log("Password does not match");
    passwordErrorMessage.style.display = "block";
    passwordConfirmationModalContainer.style.height = "38%";
    console.log(passwordConfirmationModalContainer.style.height);
  }
});

if (passwordErrorMessage.style.display === "") {
  passwordConfirmationModalContainer.style.height = "32%";
}
