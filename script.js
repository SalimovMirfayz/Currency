const apiKey = 'ce11669baf9691fbe9c60ee5';
const api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
const result = document.getElementById("result");
const replacement = document.querySelector(".replacement")

replacement.addEventListener("click", ()=> {
  let firstValue = fromDropDown.value
  let secondValue = toDropDown.value
  fromDropDown.value = secondValue
  toDropDown.value = firstValue
})

const currencies = [
  "UZS",
  "USD",
  "RUB",
  "EUR",
  ];

currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  fromDropDown.add(option);
  // Repeat same thing for the other dropdown
  const toOption = document.createElement("option");
  toOption.value = currency;
  toOption.text = currency;
  toDropDown.add(toOption);
});

fromDropDown.value = "USD";
toDropDown.value = "EUR";

let convertCurrency = () => {
  const amount = document.querySelector("#amount").value;
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  if (amount.length != 0) {
    fetch(api)
      .then((resp) => resp.json())
      .then((data) => {
        let fromExchangeRate = data.conversion_rates[fromCurrency];
        let toExchangeRate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
        result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
      });
  } 
};


document.querySelector("#convert-button").addEventListener("click", convertCurrency);
