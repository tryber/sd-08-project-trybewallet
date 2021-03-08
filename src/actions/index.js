import getCurrencyPrice from '../services/getCurrencyPrice';
import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  EDIT_EXPENSE_ADD,
  LOGIN,
  REQUEST_CURRENCIES,
  REQUEST_CURRENCIES_ERROR,
  REQUEST_CURRENCIES_SUCCESS } from './actionsType';

// Coloque aqui suas actions
export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
  isFetching: true,
});

export const requestCurrenciesSuccess = (currencies) => ({
  type: REQUEST_CURRENCIES_SUCCESS,
  currencies,
  isFetching: false,
});

export const requestCurrenciesError = (error) => ({
  type: REQUEST_CURRENCIES_ERROR,
  error,
  isFetching: false,
});

export const addNewExpense = (expenses) => ({
  type: ADD_EXPENSE,
  expenses,
});

export const deleteExpense = (expenses) => ({
  type: DELETE_EXPENSE,
  expenses,
});

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
  isEditing: true,
});

export const editExpenseAdd = (expense) => ({
  type: EDIT_EXPENSE_ADD,
  expense,
  isEditing: false,
});

export const fetchingCurrenciesThunk = () => async (dispatch) => {
  dispatch(requestCurrencies());
  try {
    const requestCurrenciesResponse = await getCurrencyPrice();
    dispatch(requestCurrenciesSuccess(requestCurrenciesResponse));
  } catch (error) {
    dispatch(requestCurrenciesError(requestCurrenciesError));
  }
};
