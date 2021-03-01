// Coloque aqui suas actions
// export const LOGIN = 'LOGIN';
import currenciesAPI from '../services/index';

export const EMAIL = 'EMAIL';
export const PASS = 'PASS';

export const emailAction = (value) => ({ type: EMAIL, value });
export const passwordAction = (value) => ({ type: PASS, value });

// export const loginAction = (value) => ({ type: LOGIN, value });

export const EXPENSES = 'EXPENSES';

export const expensesAction = (value) => ({ type: EXPENSES, value });

export const CURRENCIES_INITIAL = 'CURRENCIES_INITIAL';
export const CURRENCIES_SUCCESS = 'CURRENCIES_SUCCESS';
export const CURRENCIES_FAIL = 'CURRENCIES_FAIL';

const currenciesInitial = () => ({ type: CURRENCIES_INITIAL });
const currenciesSuccess = (currencies) => ({
  type: CURRENCIES_SUCCESS,
  currencies,
});
const currenciesFail = (error) => ({ type: CURRENCIES_FAIL, payload: { error } });

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(currenciesInitial());
  try {
    const currencies = await currenciesAPI();
    dispatch(currenciesSuccess(currencies));
  } catch (error) { dispatch(currenciesFail(error)); }
};

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const addExpense = (expenses) => ({
  type: ADD_EXPENSE,
  expenses,
});

export const DEL_EXPENSE = 'DEL_EXPENSE';
export const delExpense = (id) => ({
  type: DEL_EXPENSE,
  id,
});
