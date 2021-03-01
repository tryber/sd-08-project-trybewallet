import fetchCurrency from '../services';

const USER_INFO = 'USER_INFO';
const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
const GET_CURRENCY = 'GET_CURRENCY';
const FAILED_REQUEST = 'FAILED_REQUEST';
const SAVE_EXPENSE = 'SAVE_EXPENSE';
const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const userInfo = (email) => ({
  type: USER_INFO,
  email,
});

const requestCurrency = () => ({
  type: REQUEST_CURRENCY,
});

const getCurrency = (currencies) => ({
  type: GET_CURRENCY,
  currencies,
});

const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  error,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    dispatch(requestCurrency());

    const currencies = await fetchCurrency();

    dispatch(getCurrency(currencies));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

export const saveExpense = (expenses) => ({
  type: SAVE_EXPENSE,
  expenses,
});

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  id,
});
