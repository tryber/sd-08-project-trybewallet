import { fetchCurrenciesSymbol, fetchCurrencies } from '../services/api';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXCHANGE = 'ADD_EXCHANGE';

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
