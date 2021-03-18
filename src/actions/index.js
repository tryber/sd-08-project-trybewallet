import getCurrencies from '../services';

// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REQUEST_START = 'REQUEST_START';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAIL = 'REQUEST_FAIL';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const CONFIRM_EDITING = 'CONFIRM_EDITING';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

const requestCurrenciesTry = () => ({
  type: REQUEST_START,
});

const requestCurrenciesSuccess = (currencies) => ({
  type: REQUEST_SUCCESS,
  currencies,
});

const requestCurrenciesFail = (error) => ({
  type: REQUEST_FAIL,
  error,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    dispatch(requestCurrenciesTry());

    const currencies = await getCurrencies();

    dispatch(requestCurrenciesSuccess(currencies));
  } catch (error) {
    dispatch(requestCurrenciesFail(error));
  }
};

export const deleteExpenses = (payload) => ({
  type: DELETE_EXPENSES,
  payload,
});

export const editExpenses = (payload) => ({
  type: EDIT_EXPENSES,
  payload,
});

export const confirmEditing = (payload) => ({
  type: CONFIRM_EDITING,
  payload,
});
