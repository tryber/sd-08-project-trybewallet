// Coloque aqui suas actions
export const Login = 'LOGIN_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export default function currentUser(user) {
  return {
    type: Login,
    payload: {
      user: {
        email: user,
      },
    },
  };
}

export function requestData() {
  return {
    type: 'REQUEST_DATA',
  };
}

export function fetchCurrencies(data) {
  return {
    type: 'RECEIVE_DATA',
    payload: data,
  };
}

export function fetchData() {
  return (dispatch) => {
    dispatch(requestData());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => dispatch(fetchCurrencies(data)));
  };
}

export function newExpense(expense) {
  return {
    type: 'NEW_EXPENSE',
    payload: expense,
  };
}

export function resolveNewExpense(expense) {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((exchangeRates) => {
      dispatch(newExpense({ ...expense, exchangeRates }));
    });
}
