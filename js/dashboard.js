import backendAPI from "../api/api.js";
import getUser from "./getUser.js";

const user = await getUser(backendAPI);
const availableBalance = document.querySelector(".user_balance");
const accumulatedInterest = document.querySelector(".user_interest");
const totalDeposit = document.querySelector(".user_deposit");
const userTransaction = document.querySelector(".user-transaction");

let amount = JSON.parse(localStorage.getItem("amount")) || user.balance;

let accumulatedAmount =
  JSON.parse(localStorage.getItem("accumulatedAmount")) || 0;
setInterval(() => {
  calculateDailyReturn();
}, 86400000);

if (user.balance == null || user.balance == "" || user.balance == "null") {
  availableBalance.innerText = "$0.00";
  totalDeposit.innerText = "$0.00";
} else {
  availableBalance.innerText = `$${amount}`;
  totalDeposit.innerText = `$${amount}`;
}
if (
  user.transactions == null ||
  user.transactions == "" ||
  user.transactions == "null"
) {
  userTransaction.innerText = "0";
} else {
  userTransaction.innerText = user.transactions;
}
accumulatedInterest.innerText = `$${accumulatedAmount}.00`;

function calculateDailyReturn() {
  let dailyReturnRate = 0;
  if (user.plan == "null") {
    dailyReturnRate = 0;
  } else if (user.plan == "Basic") {
    dailyReturnRate = 0.05;
  } else if (user.plan == "Pro") {
    dailyReturnRate = 0.075;
  } else if (user.plan == "Premium") {
    dailyReturnRate = 0.1;
  } else if (user.plan == "Ultimate") {
    dailyReturnRate = 0.125;
  }

  let dailyReturn = amount * dailyReturnRate;
  amount += dailyReturn;
  accumulatedAmount += dailyReturn;

  localStorage.setItem("amount", JSON.stringify(amount));
  localStorage.setItem("accumulatedAmount", JSON.stringify(accumulatedAmount));

  availableBalance.innerText = `$${amount.toFixed(2)}`;
  totalDeposit.innerText = `$${amount.toFixed(2)}`;
  accumulatedInterest.innerText = `$${accumulatedAmount.toFixed(2)}`;
  console.log(user.plan);
}
