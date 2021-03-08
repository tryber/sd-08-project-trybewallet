// import * as types from './types';

// Coloque aqui suas actions
// const currenciesFromAPI = (currency) => ({
//   type: FETCH_CURRENCIES,
//   payload: currency,
// });

// const currenciesFetchAction = () => (dispatch) => {
//   const endpoint = ('https://economia.awesomeapi.com.br/json/all');
//   const currencies = fetch(endpoint);
//   currencies.then((response) => response.json)
//     .then((data) => dispatch(currenciesFromAPI(data)));
// };

// const currenciesFromAPI = () => {
//   return (dispatch) => {
//     const endpoint = ('https://economia.awesomeapi.com.br/json/all');
//     const currencies = fetch(endpoint);
//     currencies.then((response) => response.json)
//       .then((data) => console.log(data));
//     dispatch(currencies);
//     return {
//       type: FETCH_CURRENCIES,

//     };
//   };
// };
