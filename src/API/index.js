const URL_API = 'https://economia.awesomeapi.com.br/json/all';

const fetchAPI = () => (
  fetch(URL_API)
    .then((response) => (
      response
        .json()
        // .then((jsoned) => jsoned)
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
        // Solução prática encontrada no projeto do Massaki, principalmente esse 'response.ok';
    ))
);

export default fetchAPI;
