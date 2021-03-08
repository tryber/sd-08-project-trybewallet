const getAllCurrencies = 'https://economia.awesomeapi.com.br/json/all';
const fetchApi = () => fetch(getAllCurrencies)
  .then((data) => data.json())
  .then((values) => Object.values(values))
  .then((response) => response.filter((element) => element.codein !== 'BRLT'));

export default fetchApi;
