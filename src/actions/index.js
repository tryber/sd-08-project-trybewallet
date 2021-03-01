import { fetchCurrenciesSymbol, fetchCurrencies } from '../services/api';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXCHANGE = 'ADD_EXCHANGE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const SELECT_EXPENSE = ' SELECT_EXPENSE';
export const EDIT_EXPENSE = ' EDIT_EXPENSE';

export const user = {
  login: (payload) => ({ type: LOGIN, payload }),
  logout: () => ({ type: LOGOUT }),
};

export const wallet = {
  addExpense: (payload) => ({
    type: ADD_EXPENSE,
    payload,
  }),
  addCurrencies: (payload) => ({
    type: ADD_CURRENCIES,
    payload,
  }),
  addExchange: (payload) => ({
    type: ADD_EXCHANGE,
    payload,
  }),
  removeExpense: (payload) => ({
    type: REMOVE_EXPENSE,
    payload,
  }),
  selectExpense: (payload) => ({
    type: SELECT_EXPENSE,
    payload,
  }),
  editExpense: (payload) => ({
    type: EDIT_EXPENSE,
    payload,
  }),
};

export function getCurrencies(expense) {
  return async (dispatch) => {
    try {
      const response = await fetchCurrencies();
      const combineExpense = { ...expense, exchangeRates: response };
      dispatch(wallet.addExpense(combineExpense));
    } catch (err) {
      return err;
    }
  };
}

export function getCurrenciesSymbol() {
  return async (dispatch) => {
    try {
      const response = await fetchCurrenciesSymbol();
      dispatch(wallet.addCurrencies(response));
    } catch (err) {
      return err;
    }
  };
}
