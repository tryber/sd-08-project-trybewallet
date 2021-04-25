const getCurrencies = async () => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const request = await fetch(endpoint);
  const response = request.json();
  return response;
};

export default getCurrencies;
