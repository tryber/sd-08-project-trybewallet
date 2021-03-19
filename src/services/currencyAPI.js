const CURRENCY_BASE_API = 'https://economia.awesomeapi.com.br/json/all';

export const getCurrentCurrency = () => (
  fetch(CURRENCY_BASE_API)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getCurrentCurrency;
