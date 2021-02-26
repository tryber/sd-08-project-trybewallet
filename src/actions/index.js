import { getCurrency } from '../services/api';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const user = {
  login: (payload) => ({ type: LOGIN, payload }),
  logout: () => ({ type: LOGOUT }),
};

export const wallet = {
  addExpense: (payload) => ({
    type: ADD_EXPENSE,
    payload,
  }),
  getCurrencies: (payload) => ({
    type: GET_CURRENCIES,
    payload,
  }),
};

export function getCurrencySymbol() {
  return async (dispatch) => {
    try {
      const response = await getCurrency();
      console.log(response);
      dispatch(wallet.getCurrencies());
    } catch (err) {
      return err;
    }
  };
}
