export function fetchCurrencies() {
  const currencies = fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .catch((error) => { throw new Error(error); });

  return currencies;
}

export function getCurrenciesAcronym() {
  const currenciesAcronym = fetchCurrencies()
    .then((result) => Object.keys(result))
    .then((filtredResult) => filtredResult.filter((currency) => currency !== 'USDT'));

  return currenciesAcronym;
}
