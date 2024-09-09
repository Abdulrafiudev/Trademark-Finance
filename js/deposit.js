import backendAPI from "../api/api.js";

const selectedInput = document.querySelector(
  ".deposit_body_details_cont1 select"
);
const amountInput = document.querySelector(".deposit_body_details_cont input");
const amountError = document.querySelector(".amount_error span");
const convertedInfo = document.querySelector(".dynamic_amount_converter");
const usdInfoAmmountDiv = document.querySelector(".dollar_amount");
const depositForm = document.querySelector(".depositForm");
const spinner = document.querySelector(".spinner");
const spinnerButton = document.querySelector(".spinner_button_div");

const convertedInfoAmountDiv1 = document.querySelector(
  ".crypto_amount_statement"
);

const convertedInfoAmountDiv2 = document.querySelector(".crypto_amount");
const convertedInfoStatement = document.querySelector(
  ".dynamic_amount_converter__statement"
);

async function currencyConverter() {
  const amount = amountInput.value;
  const fromCurrency = "usd";
  const toCurrency = selectedInput.value;

  if (amount.trim() === "") {
    convertedInfo.style.display = "none";
    amountError.style.display = "block";
    return;
  } else {
    amountError.style.display = "none";
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
      console.log(response.data);

      //conversion rate from btc to usd
      const conversionRate =
        response.data[toCurrency.toLowerCase()][fromCurrency];

      const convertedAmount = (amount / conversionRate).toFixed(4);

      convertedInfo.style.display = "flex";
      usdInfoAmmountDiv.innerText = `$${amount}`;
      convertedInfoAmountDiv1.innerText = `Amount in ${toCurrency}:`;
      convertedInfoAmountDiv2.innerText = `${convertedAmount} ${toCurrency}`;
      convertedInfoStatement.innerText = `You'll receive $${amount} dollars worth of ${toCurrency} in your wallet.`;
    } catch (err) {
      console.log(err);
    }
  }
}

amountInput.addEventListener("input", currencyConverter);
selectedInput.addEventListener("change", currencyConverter);

depositForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  spinner.style.display = "block";
  spinnerButton.disabled = true;
  const formData = {
    amount: amountInput.value,
  };
  try {
    const response = await axios.post(`${backendAPI}/payments`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(response.data);
    const { data, message, status } = response.data;

    const { link } = data;
    if (status) {
      setTimeout(() => {
        window.location.href = link;
      }, 1000);
    } else {
      console.log("Invalid Payment Initialisation");
    }
  } catch (err) {
    console.log("error:", err);
  } finally {
    spinner.style.display = "none";
    spinnerButton.disabled = false;
  }
});
