import { SAVE_CURRENCIES, ADD_EXPENSE, REMOVE_EXPENSE } from './index';

const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  currencies,
});

const addExpense = (expenses) => ({
  type: ADD_EXPENSE,
  expenses,
});

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  payload: id });

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
