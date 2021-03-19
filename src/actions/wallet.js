import getCurrencies from '../services';

export const FETCH_SAVE_CURRENCIES = {
  SAVE_CURRENCIES: 'SAVE_CURRENCIES',
  FETCH_CURRENCIES: 'FETCH_CURRENCIES',
  ADD_EXPENSE: 'ADD_EXPENSE',
  ADD_EXPENSE_WITH_CURRENCIES: 'ADD_EXPENSE_WITH_CURRENCIES',
  REMOVE_EXPENSE: 'REMOVE_EXPENSE',
};

export const fetchSaveCurrencies = {
  saveCurrencies: (currencies) => ({
    type: FETCH_SAVE_CURRENCIES.SAVE_CURRENCIES,
    payload: currencies,
  }),

  fetchCurrencies: () => async (dispatch) => {
    const currencies = await getCurrencies();
    delete currencies.USDT;
    const currenciesCodes = Object.values(currencies)
      .map(({ code }) => code);
    dispatch(fetchSaveCurrencies.saveCurrencies(currenciesCodes));
  },

  addExpense: (expense) => ({
    type: FETCH_SAVE_CURRENCIES.ADD_EXPENSE,
    payload: expense,
  }),

  addExpenseWithCurrencies: (expense) => async (dispatch) => {
    const currentCurrencies = await getCurrencies();
    const addExpenseWithCurrencies = { ...expense, exchangeRates: currentCurrencies };
    dispatch(fetchSaveCurrencies.addExpense(addExpenseWithCurrencies));
  },

  removeExpense: (id) => ({ type: FETCH_SAVE_CURRENCIES.REMOVE_EXPENSE, payload: id }),
};

// funções que serão executadas, pegar as currencies, fazer o dispatch
// nas actions, adicionar despesas e action de adicionar despesas com as
// currencies
