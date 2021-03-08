const URL = 'https://economia.awesomeapi.com.br/json/all';
const getCurrencyPrice = async () => {
  const coinsList = await fetch(URL)
    .then((response) => response.json())
    .catch((error) => error.json());
  return coinsList;
};

export default getCurrencyPrice;
