import backendAPI from "../api/api.js";
import getUser from "./getUser.js";

getUser(backendAPI);

const withdrawButton = document.querySelector(".withdrawal_submit");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close_button");
const amount = document.querySelector(".amountwithdraw input");
const errorMessage = document.querySelector(".error_message");
const cryptoWallet = document.querySelector(".deposit_body_details_cont input");

amount.value = "";

amount.addEventListener("input", () => {
  if (amount.value.trim() == "") {
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
  }
});

withdrawButton.addEventListener("click", () => {
  if (amount.value.trim() == "") {
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
    modal.classList.add("show");
    document.body.style.overflowY = "hidden";
    document.body.style.height = "100vh";
  }
});

closeButton.addEventListener("click", () => {
  modal.classList.remove("show");
  document.body.style.overflowY = "scroll";
  document.body.style.height = "100vh";
});
