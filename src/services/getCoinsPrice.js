const URL = 'https://economia.awesomeapi.com.br/json/all';
const getCoinsPrice = async () => {
  const coinsList = await fetch(URL)
    .then((response) => response.json());
  return coinsList;
};

export default getCoinsPrice;
