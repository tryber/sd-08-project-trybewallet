export default async function getApi() {
  const endpoint = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await endpoint.json();
  const objKeys = Object.keys(response);
  const filterUSDT = objKeys.filter((filtUSDT) => filtUSDT !== 'USDT');
  return filterUSDT;
}
