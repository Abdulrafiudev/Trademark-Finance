import backendAPI from "../api/api.js";
import getUser from "./getUser.js";
import frontendUrl from "../api/frontend.js";

const user = await getUser(backendAPI, frontendUrl);
const ref = user.referral_code;
console.log("referral code:", ref);

const refLink = `${frontendUrl}/register.html?ref=${ref}`;
const refLinkElement = document.querySelector(".code");
const copyButton = document.querySelector(".copy_button");

refLinkElement.value = refLink;

function copyReferralLink() {
  const input = document.querySelector(".code");
  input.select();
  input.setSelectionRange(0, 99999); // for mobile
  document.execCommand("copy");
  alert("Referral link copied to clipboard!");
}

copyButton.addEventListener("click", copyReferralLink);
