export default function getCurrencies() {
  const currencies = fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => data);
  return currencies;
}
