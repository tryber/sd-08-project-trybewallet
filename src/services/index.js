const URL = 'https://economia.awesomeapi.com.br/json/all';

const currenciesAPI = () => (
  fetch(URL)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default currenciesAPI;
