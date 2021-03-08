import getCurrecies from '../services';

export const Types = {
  SAVE_EMAIL: 'SAVE_EMAIL',
  SAVE_CURRENCIES: 'SAVE_CURRENCIES',
  FETCH_CURRENCIES: 'FETCH_CURRENCIES',
  ADD_EXPENSE: 'ADD_EXPENSE',
  ADD_EXPENSE_WITH_COINS: 'ADD_EXPENSE_WITH_COINS',
};

export const Creators = {
  saveEmail: (email) => ({ type: Types.SAVE_EMAIL, payload: email }),
  saveCurrencies: (currencies) => ({ type: Types.SAVE_CURRENCIES, payload: currencies }),
  fetchCurrencies: () => async (dispatch) => {
    const currencies = await getCurrecies();
    delete currencies.USDT;
    const currenciesCode = Object.values(currencies)
      .map(({ code }) => code);
    dispatch(Creators.saveCurrencies(currenciesCode));
  },
  addExpense: (expense) => ({
    type: Types.ADD_EXPENSE,
    payload: expense,
  }),
  addExpenseWithCoins: (expense) => async (dispatch) => {
    const currentCurrencies = await getCurrecies();
    const addExpenseWithCoins = { ...expense, exchangeRates: currentCurrencies };
    dispatch(Creators.addExpense(addExpenseWithCoins));
  },
};
