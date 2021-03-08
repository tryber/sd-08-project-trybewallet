const endPoint = 'https://economia.awesomeapi.com.br/json/all';

const currenciesAPI = () => (
  fetch(endPoint)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default currenciesAPI;
