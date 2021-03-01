export default async function coinApi() {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  return data;
}

export function convertCoin(value, currency, exchangeRates) {
  switch (currency) {
  case 'USD':
    return value * exchangeRates.USD.ask;
  case 'EUR':
    return value * exchangeRates.EUR.ask;
  default:
    return value;
  }
}
