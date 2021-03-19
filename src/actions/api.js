const fetchApi = () => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response
    .json()
    .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export default fetchApi;
