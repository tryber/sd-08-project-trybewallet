import getCurr from '../services';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_EXPENSE_CURR = 'ADD_EXPENSE_CURR';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export const saveCurrencies = (curr) => ({
  type: SAVE_CURRENCIES,
  payload: curr,
});

export const fetchCurrencies = () => async (dispatch) => {
  const curr = await getCurr();
  delete curr.USDT;
  const currency = Object.values(curr).map(({ code }) => code);
  dispatch(saveCurrencies(currency));
};

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const addExpenseCurr = (expense) => async (dispatch) => {
  const currentCurr = await getCurr();
  const expenseCurr = { ...expense, exchangeRates: currentCurr };
  dispatch(addExpense(expenseCurr));
};
