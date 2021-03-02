import { LOGIN_USER, ADD_EXPENSE, FETCH_CURRENCIES } from './ActionTypes';

export const loginUser = (email) => ({ type: LOGIN_USER, payload: { email } });

export const addExpense = (expenses) => ({
  type: ADD_EXPENSE, paypload: { expenses } });

export const fetchCurrencies = (currencies) => ({
  type: FETCH_CURRENCIES, paypload: { currencies } });
