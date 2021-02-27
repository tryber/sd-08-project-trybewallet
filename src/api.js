export default async function getApiCurrency() {
  const currencies = await fetch('https://economia.awesomeapi.com.br/json/all');
  return currencies.json();
}
