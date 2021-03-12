export default async function fetchCurrency() {
  const Api = await fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json());
  return Api;
}
