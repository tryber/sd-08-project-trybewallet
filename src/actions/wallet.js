import {
  REQ_CURRENCY,
  GET_CURRENCY,
  EXPENSES_FORM,
  ADD_EXPENSES,
  DELETE_EXPENSES,
  EDIT,
  FINISH_EDIT,
} from './types';

const requestCurrency = () => ({
  type: REQ_CURRENCY,
});

const getCurrency = (payload) => ({
  type: GET_CURRENCY,
  payload,
});

export function fetchCurrency() {
  return (dispatch) => {
    dispatch(requestCurrency());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currency) => {
        delete currency.USDT;
        return currency;
      })
      .then((currency) => dispatch(getCurrency(currency)));
  };
}

export const expensesForm = (key, input) => ({
  type: EXPENSES_FORM,
  payload: {
    key,
    input,
  },
});

export const addExpenses = () => ({
  type: ADD_EXPENSES,
});

export const deleteExpenses = (payload) => ({
  type: DELETE_EXPENSES,
  payload,
});

export const edit = (payload) => ({
  type: EDIT,
  payload,
});

export const finishEdit = () => ({
  type: FINISH_EDIT,
});

export default fetchCurrency;
