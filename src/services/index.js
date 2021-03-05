const getCurrencies = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const result = response.json();
  return result;
};

export default getCurrencies;
