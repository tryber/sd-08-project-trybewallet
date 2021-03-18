import getCurrencies from '../services';

export const Types = {
  SAVE_CURRENCIES: 'SAVE_CURRENCIES',
  FETCH_CURRENCIES: 'FETCH_CURRENCIES',
  ADD_EXPENSE: 'ADD EXPENSE',
  ADD_EXPENSE_WITH_CURRENCIES: 'ADD_EXPENSE_WITH_CURRENCIES',
  REMOVE_EXPENSE: 'REMOVE_EXPENSE',
  EDIT_EXPENSE: 'EDIT_EXPENSE',
  SAVE_EXPENSE: 'SAVE_EXPENSE',
};

export const Creators = {
  saveCurrencies: (currencies) => ({
    type: Types.SAVE_CURRENCIES,
    payload: currencies,
  }),
  addExpense: (expense) => ({
    type: Types.ADD_EXPENSE,
    payload: expense,
  }),
  saveExpense: (expense) => ({
    type: Types.SAVE_EXPENSE,
    payload: expense,
  }),
  editExpense: (id) => ({
    type: Types.EDIT_EXPENSE,
    payload: id,
  }),
  removeExpense: (id) => ({ type: Types.REMOVE_EXPENSE, payload: id }),
  fetchCurrencies: () => async (dispatch) => {
    const currencies = await getCurrencies();
    delete currencies.USDT;
    const currenciesCodes = Object.values(currencies)
      .map(({ code }) => code);
    dispatch(Creators.saveCurrencies(currenciesCodes));
  },
  addExpenseWithCurrencies: (expense) => async (dispatch) => {
    const currentCurrencies = await getCurrencies();
    const expenseWithCurrencies = { ...expense, exchangeRates: currentCurrencies };
    dispatch(Creators.addExpense(expenseWithCurrencies));
  },
};
