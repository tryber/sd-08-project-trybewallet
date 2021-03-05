import getCurrencies from '../services';

// export const USER_EMAIL = 'USER_EMAIL';
// export const USER_PASSWORD = 'USER_PASSWORD';
// export const USER_CURRENCY = 'RECEIVE_CURRENCY';
// export const ADD_EXPENSE = 'ADD_EXPENSE';
// export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const userEmailAction = (value) => ({
  type: 'USER_EMAIL',
  value,
});

export const userPasswordAction = (value) => ({
  type: 'USER_PASSWORD',
  value,
});

export const userCurrency = (currencies) => ({
  type: 'USER_CURRENCY',
  value: currencies,
});

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  value: expense,
});

// export const deleteExpense = (id) => ({
//   type: 'DELETE_EXPENSE',
//   id,
// });

export const expenseExchangeRates = (expense) => async (dispatch) => {
  const currencies = await getCurrencies();
  const expenseRated = { ...expense, exchangeRates: currencies };
  dispatch(addExpense(expenseRated));
};

export const walletThunk = () => async (dispatch) => {
  const currencies = await getCurrencies();
  const currencyCodes = Object.values(currencies)
    .filter((currency) => currency.name !== 'Dólar Turismo')
    .map(({ code }) => code);
  dispatch(userCurrency(currencyCodes));
};
