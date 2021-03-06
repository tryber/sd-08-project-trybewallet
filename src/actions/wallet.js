import getCurrencies from '../services';

export const Types = {
  SAVE_CURRENCIES: 'SAVE_CURRENCIES',
  FETCH_CURRENCIES: 'FETCH_CURRENCIES',
  ADD_EXPENSE: 'ADD_EXPENSE',
  ADD_EXPENSE_WITH_CURRENCIES: 'ADD_EXPENSE_WITH_CURRENCIES',
};
export const Creators = {
  saveCurrencies: (currencies) => ({
    type: Types.SAVE_CURRENCIES,
    payload: currencies,
  }),
  fetchCurrencies: () => async (dispatch) => {
    const currencies = await getCurrencies();
    delete currencies.USDT;
    const currenciesCodes = Object.values(currencies)
      .map(({ code }) => code);
    dispatch(Creators.saveCurrencies(currenciesCodes));
  },
  addExpense: (expense) => ({
    type: Types.ADD_EXPENSE,
    payload: expense,
  }),
  addExpenseWithCurencies: (expense) => async (dispatch) => {
    const currentCurrency = await getCurrencies();
    const expenseWithCurrencies = { ...expense, exchangeRates: currentCurrency };
    dispatch(Creators.addExpense(expenseWithCurrencies));
  },
};
