export default async function getCurrencyList() {
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currencies) => Object.keys(currencies).filter((currency) => i !== 'USDT'));
}

export async function fetchCurrency() {
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currencies) => currencies);
}
