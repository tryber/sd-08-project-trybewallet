const getCurrencies = async () => {
  const Api = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(Api);
  return response.json();
};

export default getCurrencies;
