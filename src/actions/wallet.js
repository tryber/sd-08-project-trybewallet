import {
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES,
  CHANGE_EXPENSE_FORM,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  IS_EDITING,
  FINISHES_EDIT,
} from './constants';

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const receiveCurrencies = (payload) => ({
  type: RECEIVE_CURRENCIES,
  payload,
});

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => {
        delete currencies.USDT;
        return currencies;
      })
      .then((currencies) => dispatch(receiveCurrencies(currencies)));
  };
}

export const changeExpense = (key, input) => ({
  type: CHANGE_EXPENSE_FORM,
  payload: {
    key,
    input,
  },
});

export const addExpense = () => ({
  type: ADD_EXPENSE,
});

export const removeExpense = (payload) => ({
  type: REMOVE_EXPENSE,
  payload,
});

export const isEditing = (payload) => ({
  type: IS_EDITING,
  payload,
});

export const finishesEdit = () => ({
  type: FINISHES_EDIT,
});

export default fetchCurrencies;
