export function fetchCurrencies() {
  const currencies = fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((res) => {
      delete res.USDT;
      return res;
    })
    .catch((error) => { throw new Error(error); });

  return currencies;
}

export function getCurrenciesAcronym() {
  const currenciesAcronym = fetchCurrencies()
    .then((result) => Object.keys(result));

  return currenciesAcronym;
}
