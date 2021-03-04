import currenciesAPI from '../services';

export const EMAIL = 'EMAIL';
export const REQUEST_START = 'REQUEST_START';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAIL = 'REQUEST_FAIL';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const emailChange = (payload) => ({
  type: EMAIL,
  payload,
});

const requestCurrencies = () => ({
  type: REQUEST_START,
});

const requestCurrenciesSuccess = (currencies) => ({
  type: REQUEST_SUCCESS,
  currencies,
});

const requestCurrenciesFail = (error) => ({
  type: REQUEST_FAIL,
  error,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    dispatch(requestCurrencies());
    const currencies = await currenciesAPI();
    dispatch(requestCurrenciesSuccess(currencies));
  } catch (error) {
    dispatch(requestCurrenciesFail(error));
  }
};

export const saveExpense = (expenses) => ({
  type: SAVE_EXPENSE,
  expenses,
});
