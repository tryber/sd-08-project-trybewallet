export default async function getCoin() {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const coin = await fetch(endpoint);
  const coinJson = await coin.json();
  return coinJson;
}
