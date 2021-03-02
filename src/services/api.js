const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

const getCoins = async () => {
  const response = await (await fetch(ENDPOINT)).json();
  return response;
};

export default getCoins;
