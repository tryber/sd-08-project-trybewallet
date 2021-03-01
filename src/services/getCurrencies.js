const getCurrencies = async () => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(endpoint);
  return response.json();
};

export default getCurrencies;
