const https = {
  currencies: 'https://economia.awesomeapi.com.br/json/all',
};

export async function getCurrencies() {
  try {
    const response = await fetch(https.currencies);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export function fetchCurrenciesSymbol() {
  return getCurrencies().then((currencies) => {
    delete currencies.USDT;
    return Object.keys(currencies).map((currency) => currency);
  });
}

export function fetchCurrencies() {
  return getCurrencies().then((currencies) => {
    delete currencies.USDT;
    return currencies;
  });
}
