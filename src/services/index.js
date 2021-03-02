export default async function getCurrencies() {
  const getResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currenciesJson = getResponse.json();
  return currenciesJson;
}
