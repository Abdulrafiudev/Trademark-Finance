import backendAPI from "../api/api.js";
import getUser from "./getUser.js";
import frontendUrl from "../api/frontend.js";

const user = await getUser(backendAPI, frontendUrl);
const availableBalance = document.querySelector(".user_balance");
const accumulatedInterest = document.querySelector(".user_interest");
const totalDeposit = document.querySelector(".user_deposit");
const userTransaction = document.querySelector(".user-transaction");

export let amount = user.balance;

if (user.balance == null || user.balance == "" || user.balance == "null") {
  availableBalance.innerText = "$0.00";
  totalDeposit.innerText = "$0.00";
} else {
  availableBalance.innerText = `$${amount.toFixed(2)}`;
  totalDeposit.innerText = `$${user.deposit.toFixed(2)}`;
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
accumulatedInterest.innerText = `$${user.interest.toFixed(2)}`;
