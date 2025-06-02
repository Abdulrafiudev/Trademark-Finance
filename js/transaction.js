import backendAPI from "../api/api.js";
import getUser from "./getUser.js";
import frontendUrl from "../api/frontend.js";

const user = await getUser(backendAPI, frontendUrl);
const userEmail = user.email;
console.log("userEmail:", userEmail);

const transactions =
  JSON.parse(localStorage.getItem(`transaction_${userEmail}`)) || [];

console.log("transactions:", transactions);

if (window.location.pathname.includes("transaction.html")) {
  const transactionSection = document.querySelector(".transaction_list_body");

  function renderTransaction(data = transactions) {
    let transactionHtml = ``;
    data.forEach((transaction, index) => {
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

    const deleteButton = document.querySelectorAll(".delete_button");
    console.log("delete button:", deleteButton);
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
  }

  renderTransaction();

  // document.addEventListener("DOMContentLoaded", () => {});

  // Filtering functionality
  const dateInput = document.getElementById("filter-date");
  const amountInput = document.getElementById("filter-amount");
  const statusInput = document.getElementById("filter-status");
  const filterForm = document.querySelector(".filter-form");

  filterForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const filterDate = dateInput?.value.trim(); // Format: "YYYY-MM-DD"
    const filterAmount = amountInput?.value.trim();
    const filterStatus = statusInput?.value.trim().toLowerCase(); // "deposit" or "withdrawal"

    const filtered = transactions.filter((tx) => {
      const matchDate = !filterDate || tx.transacted === filterDate;
      const matchAmount = !filterAmount || tx.amount.includes(filterAmount);
      const matchStatus =
        !filterStatus ||
        tx.statusbar.toLowerCase().includes(filterStatus.toLowerCase());

      return matchDate && matchAmount && matchStatus;
    });
    console.log("Filtered Transactions:", filtered);

    renderTransaction(filtered);
  });
}

export default transactions;
