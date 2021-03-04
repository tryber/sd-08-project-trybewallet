const API_URL = 'https://economia.awesomeapi.com.br/json/all';

const currenciesAPI = () => (
  fetch(API_URL)
    .then((r) => (
      r.json()
        .then((json) => (r.ok ? Promise.resolve(json) : Promise.resolve(json)))
    ))
);

export default currenciesAPI;
