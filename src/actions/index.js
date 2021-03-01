import getCurrencies from '../services/getCurrencies';

export const userEmailAction = (value) => ({
  type: 'LOGIN_EMAIL',
  value,
});

export const userPasswordAction = (value) => ({
  type: 'LOGIN_PASSWORD',
  value,
});

export const userCurrenciesAction = (currencies) => ({
  type: 'USER_CURRENCIES',
  payload: currencies,
});

export const addExpensesAction = (expense) => ({
  type: 'ADD_EXPENSE',
  payload: expense,
});

export const expenseExchangeRates = (expense) => async (dispatch) => {
  const currencies = await getCurrencies();
  const expenseRated = { ...expense, exchangeRates: currencies };
  dispatch(addExpensesAction(expenseRated));
};

export const walletThunk = () => async (dispatch) => {
  const currencies = await getCurrencies();
  const currenciesCodes = Object.values(currencies)
    .filter((currency) => currency.name !== 'Dólar Turismo')
    .map(({ code }) => code);
  dispatch(userCurrenciesAction(currenciesCodes));
};
