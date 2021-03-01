import requestCurrencies from '../services/index';

function login(email) {
  return ({
    type: 'LOGIN',
    email,
  });
}

export const Types = {
  SAVE_CURRENCIES: 'SAVE_CURRENCIES',
  FETCH_CURRENCIES: 'FETCH_CURRENCIES',
  ADD_EXPENSE: 'ADD_EXPENSE',
  ADD_EXPENSE_WITH_CURRENCIES: 'ADD_EXPENSE_WITH_CURRENCIES',
};

export const ActionsExpense = {
  saveCurrencies: (currencies) => ({
    type: Types.SAVE_CURRENCIES,
    payload: currencies,
  }),
  fetchCurrencies: () => async (dispatch) => {
    const currencies = await requestCurrencies();
    delete currencies.USDT;
    const currenciesCodes = Object.values(currencies)
      .map(({ code }) => code);
    dispatch(ActionsExpense.saveCurrencies(currenciesCodes));
  },
  addExpense: (expense) => ({
    type: Types.ADD_EXPENSE,
    payload: expense,
  }),
  addExpenseWithCurrencies: (expense) => async (dispatch) => {
    const currentCurrencies = await requestCurrencies();
    const expenseWithCurrencies = { ...expense, exchangeRates: currentCurrencies };
    dispatch(ActionsExpense.addExpense(expenseWithCurrencies));
  },
};

export default login;
