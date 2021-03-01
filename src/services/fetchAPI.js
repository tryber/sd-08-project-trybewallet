const API_URL = 'https://economia.awesomeapi.com.br/json/all';

const getAPIData = async () => {
  const responseAPI = await fetch(API_URL);
  const jsonResponse = await responseAPI.json();
  return jsonResponse;
};

export default getAPIData;
