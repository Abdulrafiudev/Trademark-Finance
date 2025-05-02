import getUser from "./getUser.js";
import backendAPI from "../api/api.js";
import frontendUrl from "../api/frontend.js";

const user = getUser(backendAPI, frontendUrl);
const userEmail = user.email;

console.log("userEmail:", userEmail);

const transactions =
  JSON.parse(localStorage.getItem(`transaction_${userEmail}`)) || [];

export default transactions;
