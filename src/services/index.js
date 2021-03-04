const getCurrencies = async () => {
  const api = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(api);
  return response.json();
};

export default getCurrencies;
