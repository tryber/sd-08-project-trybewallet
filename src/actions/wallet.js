import {
  GET_CURRENCIES,
  GET_EXPENSES,
  DELETE_EXPENSE,
} from './constants';
import getAPI from '../services/RequestApi';

export const getCurrencies = (Currencies) => ({
  type: GET_CURRENCIES,
  Currencies,
});
export const getExpenses = (expenses) => ({
  type: GET_EXPENSES,
  expenses,
});
export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export function fetchAPI() {
  return async (dispatch) => {
    try {
      const apiRequest = await getAPI();
      const apiResponseObjects = Object.entries(apiRequest);
      dispatch(getCurrencies(apiResponseObjects));
    } catch (error) {
      return error;
    }
  };
}
export function getExpensesWithCoins(expenses) {
  return async (dispatch) => {
    try {
      const newApiRequest = await getAPI();
      const expensesWithCoins = { ...expenses, exchangeRates: newApiRequest };
      dispatch(getExpenses(expensesWithCoins));
    } catch (error) {
      return error;
    }
  };
}
