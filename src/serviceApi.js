const CURRENCIES_API = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencies = () => (
  fetch(CURRENCIES_API)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getCurrencies;
