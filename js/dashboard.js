import backendAPI from "../api/api.js";
import getUser from "./getUser.js";

const user = await getUser(backendAPI);
const availableBalance = document.querySelector(".user_balance");
const accumulatedInterest = document.querySelector(".user_interest");
const totalDeposit = document.querySelector(".user_deposit");
const userTransaction = document.querySelector(".user-transaction");

if (user.balance == null || user.balance == "" || user.balance == "null") {
  availableBalance.innerText = "$0.00";
  totalDeposit.innerText = "$0.00";
} else {
  availableBalance.innerText = `$${user.balance}.00`;
  totalDeposit.innerText = `$${user.balance}.00`;
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
