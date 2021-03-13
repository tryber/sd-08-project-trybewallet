const API_CURRENCIES = 'https://economia.awesomeapi.com.br';

const apiCurrencies = async () => {
  try {
    const requestApi = await fetch(`${API_CURRENCIES}/json/all`);
    const response = await requestApi.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default apiCurrencies;
