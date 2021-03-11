const getCurrencies = async () => {
  const enpoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(enpoint);
  return response.json();
};

export default getCurrencies;
