export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const NEW_CURRENCY_UID = 'NEW_CURRENCY_UID';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  currencies,
});

const addExpense = (expenses) => ({
  type: ADD_EXPENSE,
  expenses,
});

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await response.json();
  const typeCurrencies = Object.values(currencies)
    .filter((cur) => cur.codein === 'BRL').map(({ code }) => code);
  dispatch(saveCurrencies(typeCurrencies));
};

export const fetchExpense = (expense) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currentCurrency = await response.json();
  const expenseCurrency = {
    ...expense,
    exchangeRates: currentCurrency,
  };
  dispatch(addExpense(expenseCurrency));
};
