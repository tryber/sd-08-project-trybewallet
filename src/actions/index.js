import getCoins from '../services/api';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const REQUEST_EXPENSE = 'REQUEST_CURRENCY';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const REQUEST_EXPENSE_ERROR = 'REQUEST_EXPENSE_ERROR';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  currencies,
});

const addExpense = (expenses) => ({
  type: ADD_EXPENSE,
  expenses,
});

const deleteExpense = (expenses) => ({
  type: 'DELETE_EXPENSE',
  expenses,
});

export const fetchCurrencies = () => async (dispatch) => {
  const currencies = await getCoins();
  const currency = Object.values(currencies).filter((cur) => cur.name !== 'Dolár Turismo')
    .reduce((acc, cur) => {
      acc[cur.code] = cur;
      return acc;
    }, {});
  const coinsType = Object.values(currency).map(({ code }) => code);
  dispatch(saveCurrencies(coinsType));
};

export const fetchExpense = (expense) => async (dispatch) => {
  const currentCurrency = await getCoins();
  const expenseCurrency = {
    ...expense,
    exchangeRates: currentCurrency,
  };
  dispatch(addExpense(expenseCurrency));
};

export { saveCurrencies, addExpense, deleteExpense };
