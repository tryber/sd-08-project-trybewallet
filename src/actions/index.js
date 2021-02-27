// Coloque aqui suas actions

const URL = 'https://economia.awesomeapi.com.br/json/all';

export const emailAdd = (email) => ({
  type: 'EMAIL_ADD',
  payload: email,
});

export const expenseAdd = (expense) => (dispatch) => {
  fetch(URL)
    .then(() => dispatch({
      type: 'EXPENSE_ADD',
      payload: expense,
    }));
};

// export const currencies = () => (dispatch) => {
//   fetch(`${URL}`)
//     .then((resp) => dispatch({ type: 'CURRENCIES_ADD', payload: [...resp.data] }));
// };
