import currenciesAPI from '../services';

export const LOGIN = 'LOGIN';
export const REQUEST_START = 'REQUEST_START';
export const REQUEST_SUCESS = 'REQUEST_SUCESS';
export const REQUEST_FAIL = 'REQUEST_FAIL';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const login = (email) => ({
  type: LOGIN,
  email,
});

const requestCurrenciesTry = () => ({
  type: REQUEST_START,
});

const requestCurrenciesSucess = (currencies) => ({
  type: REQUEST_SUCESS,
  currencies,
});

const requestCurrenciesFail = (error) => ({
  type: REQUEST_FAIL,
  error,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    dispatch(requestCurrenciesTry());
    const currencies = await currenciesAPI();
    dispatch(requestCurrenciesSucess(currencies));
  } catch (error) {
    dispatch(requestCurrenciesFail(error));
  }
};

export const saveExpense = (expenses) => ({
  type: SAVE_EXPENSE,
  expenses,
});
