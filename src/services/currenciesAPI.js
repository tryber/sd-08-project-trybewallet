const currenciesAPI = async () => {
  const resApi = await fetch('https://economia.awesomeapi.com.br/json/all');
  const resJson = await resApi.json();
  console.log('fetch button');
  return resJson;
};

export default currenciesAPI;
