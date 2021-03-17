export const fetchCurrencies = async () => {
  const currencies = await fetch('https://economia.awesomeapi.com.br/json/all');
  const list = await currencies.json();
  const correctList = Object.keys(list).filter((item) => item !== 'USDT');
  return correctList;
};

export const fetchCurrentExchange = async () => {
  let currencies = await fetch('https://economia.awesomeapi.com.br/json/all');
  currencies = await currencies.json();
  return currencies;
};
