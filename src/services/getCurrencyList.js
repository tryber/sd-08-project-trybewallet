const URL = 'https://economia.awesomeapi.com.br/json/all';

export default async function getCurrencyList() {
  return fetch(URL)
    .then((response) => response.json())
    .then((currencies) => Object.keys(currencies)
      .filter((currency) => currency !== 'USDT'));
}

export async function fetchCurrency() {
  return fetch(URL)
    .then((response) => response.json())
    .then((currencies) => currencies);
}
