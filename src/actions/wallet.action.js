import getCurrencies from '../services'; // api

export const Types = {
  SAVE_CURRENCIES: 'SAVE_CURRENCIES',
  FETCH_CURRENCIES: 'FETCH_CURRENCIES',
  ADD_EXPENSE: 'ADD_EXPENSE',
  ADD_EXPENSE_WITH_CURRENCIES: 'ADD_EXPENSE_WITH_CURRENCIES',
  REMOVE_EXPENSE: 'REMOVE_EXPENSE',
};

export const Creators = {
  saveCurrencies: (currencies) => ({
    type: Types.SAVE_CURRENCIES,
    payload: currencies,
  }),
  fetchCurrencies: () => async (dispatch) => {
    const currencies = await getCurrencies();
    delete currencies.USDT;
    const currenciesCodes = Object.values(currencies).map(({ code }) => code);
    dispatch(Creators.saveCurrencies(currenciesCodes));
  },
  addExpensewithCurrencies: (payload) => ({
    type: Types.ADD_EXPENSE_WITH_CURRENCIES,
    payload,
  }),
  removeExpense: (payload) => ({
    type: Types.REMOVE_EXPENSE,
    payload,
  }),
};

export const addExpensewithCurrencies = (expense) => async (dispatch) => {
  const currentCurrencies = await getCurrencies();
  const expenseWithCurrencies = { ...expense, exchangeRates: currentCurrencies };
  dispatch(Creators.addExpensewithCurrencies(expenseWithCurrencies));
};
