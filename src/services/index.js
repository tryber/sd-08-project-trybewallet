const getCurrencies = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  return response.json();
};

export default getCurrencies;
