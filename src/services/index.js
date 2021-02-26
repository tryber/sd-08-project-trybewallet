export default async function fetchCoins() {
  const coinsResponse = await fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json());
  return coinsResponse;
}
