// Coloque aqui suas actions
import axios from 'axios';

const URL = 'https://economia.awesomeapi.com.br/json/all';

export const emailAdd = (email) => ({
  type: 'EMAIL_ADD',
  payload: email,
});

export const currencies = () => (dispatch) => {
  axios.get(`${URL}`)
    .then((resp) => dispatch({ type: 'CURRENCIES_ADD', payload: [...resp.data] }));
};
