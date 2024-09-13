import transactions from "./transactionArray.js";

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
const bitcoinWallet = "1FfmbHfnpaZjKFvyi1okTjJJusN455paPH";
const tetherWallet = "1FfmbHf4444444Fvyi1okTjJJusN455paPH";
const ethereumWallet = "1FfmbHfnpaZjKFvyi1okTjJJ57jjdsguyegvwugvas";
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

confirmButton.addEventListener("click", () => {
  spinner.style.display = "block";
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
    statusbar: "🟡Pending",
  };
  transactions.push(itemTransacted);
  localStorage.setItem("transaction", JSON.stringify(transactions));
  setTimeout(() => {
    window.location.href = "../transaction.html";
  }, 3000);
});

const closeButton = document.querySelector(".close_button");
closeButton.addEventListener("click", () => {
  modal.classList.remove("show");
  document.body.style.overflowY = "scroll";
  document.body.style.height = "100vh";
});

amountInput.addEventListener("input", currencyConverter);
selectedInput.addEventListener("change", currencyConverter);
