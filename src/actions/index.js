export const USER_LOGIN = 'USER_LOGIN';
export const NEW_EXPENSE = 'NEW_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const REQUEST_START = 'REQUEST_START';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const REQUEST_FAILED = 'REQUEST_FAILED';

export const actionLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const newExpense = (payload) => ({
  type: NEW_EXPENSE,
  payload,
});

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const requestStart = () => ({
  type: REQUEST_START,
  payload: {
    isFetching: false,
  },
});

export const requestCurrency = (currency) => ({
  type: REQUEST_CURRENCY,
  payload: {
    currency,
    isFetching: false,
  },
});

const requestFailed = (error) => ({
  type: REQUEST_FAILED,
  error,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    try {
      dispatch(requestStart());

      const responseAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
      const resultJson = await responseAPI.json();
      const currencies = Object.keys(resultJson)
        .filter((currency) => currency !== 'USDT');

      dispatch(requestCurrency(currencies));
    } catch (error) {
      dispatch(requestFailed(error));
    }
  };
}
