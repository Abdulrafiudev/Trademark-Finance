import transactions from "./transactionArray.js";
import backendAPI from "../api/api.js";
import getUser from "./getUser.js";
import frontendUrl from "../api/frontend.js";

const user = await getUser(backendAPI, frontendUrl);

const selectedInput = document.querySelector(
  ".deposit_body_details_cont1 select"
);
const amountInput = document.querySelector(".deposit_body_details_cont input");
const amountError = document.querySelector(".amount_error span");
const cryptoError = document.querySelector(".crypto_error span");
const convertedInfo = document.querySelector(".dynamic_amount_converter");
const usdInfoAmmountDiv = document.querySelector(".dollar_amount");
const depositForm = document.querySelector(".depositForm");
const spinner = document.querySelector(".spinner1");
const spinnerButton = document.querySelector(".spinner_button_div1");
const modalHeader = document.querySelector(".deposit_modal h2");
const modalStatement = document.querySelector(".deposit_modal_statement");
const walletAddress = document.querySelector(".deposit_modal_address__wallet");
// const bitcoinWallet = "bc1q4lfmrrzvg4n9vkt6uv57qv4xxe5qslp8nmx3d0";
//me
const bitcoinWallet = "bc1q9ydy93q5lt628ndxd7fhy82a2j3hk299jr9j68";
const tetherWallet = "TRaw2EZti39siHfJep8ggnkDSjjPhc5bkd";
// const ethereumWallet = "0x6C6380350a42bE99b2D9c81168339E0c3E9b5cb6";
//me
const ethereumWallet = "0xD877c32E4Ed078896fd0267963c6b68123c7Bdaa";
// const solanaWallet = "9MWc9X84KLucxXn715uhB9Z1QSjd7uvdNg5PkJXj9TkB";
//me
const solanaWallet = "BQg9kfCi5ppUqrLFRLMViaW8QRG5eqc9qr4pQoAnq9Ty";
const confirmButton = document.querySelector(".confirm_button");

const convertedInfoAmountDiv1 = document.querySelector(
  ".crypto_amount_statement"
);

const convertedInfoAmountDiv2 = document.querySelector(".crypto_amount");
const convertedInfoStatement = document.querySelector(
  ".dynamic_amount_converter__statement"
);
const modal = document.querySelector(".modal");

amountInput.value = "";

let convertedAmount = "";
let toCurrency = "";

async function currencyConverter() {
  const amount = amountInput.value;
  const fromCurrency = "usd";
  toCurrency = selectedInput.value;

  if (amount.trim() === "") {
    convertedInfo.style.display = "none";
    amountError.style.display = "block";
    return;
  } else {
    amountError.style.display = "none";
    if (toCurrency !== "null") {
      cryptoError.style.display = "none";
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          {
            params: {
              ids: toCurrency.toLowerCase(),
              vs_currencies: fromCurrency.toLowerCase(),
            },
          }
        );
        console.log("response:", response.data);

        //conversion rate from usd to btc
        const conversionRate =
          response.data[toCurrency.toLowerCase()][fromCurrency];

        convertedAmount = (amount / conversionRate).toFixed(4);

        convertedInfo.style.display = "flex";
        usdInfoAmmountDiv.innerText = `$${amount}`;
        convertedInfoAmountDiv1.innerText = `Amount in ${toCurrency}:`;
        convertedInfoAmountDiv2.innerText = `${convertedAmount} ${toCurrency}`;
        convertedInfoStatement.innerText = `You'll receive $${amount} dollars worth of ${toCurrency} in your wallet.`;

        //form logic
        depositForm.addEventListener("submit", async (e) => {
          e.preventDefault();

          modal.classList.add("show");
          document.body.style.overflowY = "hidden";
          document.body.style.height = "100vh";
          console.log("toCurrency:", toCurrency);
          if (toCurrency == "Bitcoin") {
            modalHeader.innerText = `Bitcoin wallet payment`;
            modalStatement.innerHTML = `You have requested <span style="color: green;">$${amount} </span> worth of ${toCurrency}.Please pay <span style="color: green;">${convertedAmount} ${toCurrency} </span>for a
            successful payment.`;
            walletAddress.innerText = bitcoinWallet;
          } else if (toCurrency == "Tether") {
            console.log("working");
            modalHeader.innerText = `Tether wallet payment`;
            modalStatement.innerHTML = `You have requested <span style="color: green;">$${amount}</span> worth of ${toCurrency}.Please pay <span style="color: green;">${convertedAmount} ${toCurrency}</span> for a
          successful payment.`;
            walletAddress.innerText = tetherWallet;
          } else if (toCurrency == "Ethereum") {
            modalHeader.innerText = `Ethereum wallet payment`;
            modalStatement.innerHTML = `You have requested <span style="color: green;">$${amount} </span> worth of ${toCurrency}.Please pay <span style="color: green;">${convertedAmount} ${toCurrency}</span> for a
            successful payment.`;
            walletAddress.innerText = ethereumWallet;
          } else if (toCurrency == "Solana") {
            modalHeader.innerText = `Solana wallet payment`;
            modalStatement.innerHTML = `You have requested <span style="color: green;">$${amount} </span> worth of ${toCurrency}.Please pay <span style="color: green;">${convertedAmount} ${toCurrency}</span> for a
            successful payment.`;
            walletAddress.innerText = solanaWallet;
          } else {
            console.log("error");
          }
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      cryptoError.style.display = "block";
      console.log("crypto error");
    }
  }
}

confirmButton.addEventListener("click", async () => {
  spinner.style.display = "block";
  try {
    $(function () {
      toastr.info("Processing Payment");
    });
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const itemTransacted = {
      delete: '<a class="fa fa-trash icon-delete-product"></a>',
      trx: `tr-${Date.now()}`,
      transacted: `${year}-${month}-${day}`,
      amount: `${convertedAmount} ${toCurrency}`,
      // statusbar: "🟡Pending",
      statusbar: "Deposit ➡️",
    };
    transactions.push(itemTransacted);
    localStorage.setItem("transaction", JSON.stringify(transactions));
    const formData = {
      amount: amountInput.value,
      currency: toCurrency,
      email: user.email,
    };
    const response = await axios.post(
      `${backendAPI}/confirmDeposit`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("response:", response.data.message);
    setTimeout(() => {
      window.location.href = "../transaction.html";
    }, 3000);
  } catch (err) {
    console.log(err);
  }
});

const closeButton = document.querySelector(".close_button");
closeButton.addEventListener("click", () => {
  modal.classList.remove("show");
  document.body.style.overflowY = "scroll";
  document.body.style.height = "100vh";
});

amountInput.addEventListener("input", currencyConverter);
selectedInput.addEventListener("change", currencyConverter);
