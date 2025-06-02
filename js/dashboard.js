import backendAPI from "../api/api.js";
import getUser from "./getUser.js";
import frontendUrl from "../api/frontend.js";

const user = await getUser(backendAPI, frontendUrl);
const availableBalance = document.querySelector(".user_balance");
const accumulatedInterest = document.querySelector(".user_interest");
const totalDeposit = document.querySelector(".user_deposit");
const userTransaction = document.querySelector(".user-transaction");
const activePlan = document.querySelector(".active_plan");
const withdrawableAmount = document.querySelector(".withdrawable_amount");

export let amount = user.balance;

if (user.balance == null || user.balance == "" || user.balance == "null") {
  availableBalance.innerText = "$0.00";
  totalDeposit.innerText = "$0.00";
} else {
  availableBalance.innerText = `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
  totalDeposit.innerText = `$${user.deposit.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
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
if (user.interest == null || user.interest == "null" || user.interest == 0) {
  accumulatedInterest.innerText = "$0.00";
}
accumulatedInterest.innerText = `$${user.interest.toLocaleString("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}`;

activePlan.innerText =
  user.plan == null || user.plan == "null" ? "No active plan" : user.plan;

withdrawableAmount.innerText =
  user.referral_bonus == 0 || user.referral_bonus == "0"
    ? "$0.00"
    : `$${user.referral_bonus.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
