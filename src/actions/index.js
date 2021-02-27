export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const LOGIN = 'LOGIN';
export const START_REQUEST = 'START_REQUEST';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const startRequest = () => ({
  type: START_REQUEST,
  payload: {
    isFetching: true,
  },
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: {
    currencies,
    isFetching: false,
  },
});

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(startRequest());

    const apiResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const apiJson = await apiResponse.json();
    const currencies = Object.keys(apiJson).filter((currency) => currency !== 'USDT');

    dispatch(getCurrencies(currencies));
  };
}
