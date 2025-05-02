import backendAPI from "../api/api.js";
import getUser from "./getUser.js";
import frontendUrl from "../api/frontend.js";

const user = getUser(backendAPI, frontendUrl);
const userEmail = user.email;

const transactions =
  JSON.parse(localStorage.getItem(`transaction_${userEmail}`)) || [];

console.log("transactions:", transactions);

const transactionSection = document.querySelector(".transaction_list_body");

function renderTransaction() {
  let transactionHtml = ``;
  transactions.forEach((transaction, index) => {
    transactionHtml += `
        <tr>
                      <td class="text-center delete_button" data-index="${index}">
                        ${transaction.delete}
                      </td>
                      <td class="text-left">
                        <span class="product"> ${transaction.trx}</span>
                      </td>
                      <td class="text-left"><span class="price">${transaction.transacted}</span></td>
                      <td class="text-left">
                        <span>${transaction.amount}</span>
                      </td>
                      <td class="text-left">
                        <span class="price"> ${transaction.statusbar}</span>
                      </td>
                    </tr>
        `;
  });
  transactionSection.innerHTML = transactionHtml;
}

document.addEventListener("DOMContentLoaded", () => {
  const deleteButton = document.querySelectorAll(".delete_button");
  console.log(deleteButton);
  deleteButton.forEach((button) => {
    console.log(button);
    button.addEventListener("click", (e) => {
      console.log("event:", e);
      const p_index = button.getAttribute("data-index");
      console.log("current:", p_index);
      transactions.splice(p_index, 1);
      localStorage.setItem(
        `transaction_${userEmail}`,
        JSON.stringify(transactions)
      );
      renderTransaction();
      console.log(transactions);
    });
  });
});

renderTransaction();
