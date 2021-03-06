import requestAPI from '../services/requestAPI';

export const LOGIN_USER_EMAIL = 'LOGIN_USER_EMAIL';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSES = 'ADD_ADD_EXPENSES';
export const EXPENSES_WITH_COINS = 'EXPENSES_WITH_COINS';

// action User
export const addEmailStore = (email) => ({
  type: LOGIN_USER_EMAIL,
  email,
});

// Action currencies
export const addCurrencies = (currencies) => ({
  type: ADD_CURRENCIES,
  currencies,
});

// thunk Currecies
export const getCurrenciesThunk = () => (dispatch) => {
  requestAPI().then((resp) => dispatch(addCurrencies(
    Object.keys(resp).filter(((coinss) => coinss !== 'USDT')),
  )));
};

// action Add expenses

export const addExpenses = (expense) => ({
  type: ADD_EXPENSES,
  payload: expense,
});

// thunk expenses
export const addExpensesThunk = (expense) => async (dispatch) => {
  const request = await requestAPI();
  const reqeustObject = { ...expense, exchangeRates: request };
  dispatch(addExpenses(reqeustObject));
};
