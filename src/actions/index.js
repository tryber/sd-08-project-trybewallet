// Coloque aqui suas actions

// const URL = 'https://economia.awesomeapi.com.br/json/all';

export const emailAdd = (email) => ({
  type: 'EMAIL_ADD',
  payload: email,
});

export const currenciesAdd = (email) => ({
  type: 'CURRENCIES_ADD',
  payload: email,
});

// export const currencies = () => (dispatch) => {
//   fetch(`${URL}`)
//     .then((resp) => dispatch({ type: 'CURRENCIES_ADD', payload: [...resp.data] }));
// };
