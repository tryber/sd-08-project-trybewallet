const ECONOMY_API = 'https://economia.awesomeapi.com.br/';

export const getCurrentCurrencies = () => (
  fetch(`${ECONOMY_API}/json/all`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getCurrentCurrencies;
