export const fetchCurrencies = async () => {
  let currencies = await fetch('https://economia.awesomeapi.com.br/json/all');
  currencies = await currencies.json();
  return currencies;
};

export const getCurrency = () => {
  const currencies = fetchCurrencies();
  const currencyList = Object.keys(currencies).filter((item) => item !== 'USDT');
  return currencyList;
};
