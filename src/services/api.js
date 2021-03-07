const CURRENCY_BASE_API = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencyTypes = () => (
  fetch(CURRENCY_BASE_API)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getCurrencyTypes;
