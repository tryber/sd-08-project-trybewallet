// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const REQUEST_START = 'REQUEST_START';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAIL = 'REQUEST_FAIL';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE_START = 'EDIT_EXPENSE_START';
export const EDIT_EXPENSE_END = 'EDIT_EXPENSE_END';

export const saveEmail = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});

const URL = 'https://economia.awesomeapi.com.br/json/all';

export const getCurrencies = () => (
  fetch(URL)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);
