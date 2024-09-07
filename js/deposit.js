const selectedInput = document.querySelector(
  ".deposit_body_details_cont1 select"
);
const amountInput = document.querySelector(".deposit_body_details_cont input");
const amountError = document.querySelector(".amount_error span");
const convertedInfo = document.querySelector(".dynamic_amount_converter");
const usdInfoAmmountDiv = document.querySelector(".dollar_amount");

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
