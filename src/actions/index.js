import getCurrencies from '../serviceApi';

export const LOGIN = 'LOGIN';
export const loginAction = (email) => ({
  type: LOGIN,
  payload: {
    email,
  },
});

export const REQUEST_CURRENCIES_API = 'REQUEST_CURRENCIES_API';
export const REQUEST_CURRENCIES_API_SUCCESS = 'REQUEST_CURRENCIES_API_SUCCESS';
export const REQUEST_CURRENCIES_API_ERROR = 'REQUEST_CURRENCIES_API_ERROR';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

const requestCurrenciesAPI = () => ({
  type: REQUEST_CURRENCIES_API,
  payload: {
    isFetching: true,
  },
});

const requestCurrenciesAPISuccess = (currencies) => ({
  type: REQUEST_CURRENCIES_API_SUCCESS,
  payload: { currencies, isFetching: false },
});

const requestCurrenciesAPIError = (error) => ({
  type: REQUEST_CURRENCIES_API_ERROR,
  payload: { error, isFetching: false },
});

export const fetchCurrenciesAPI = () => async (dispatch) => {
  dispatch(requestCurrenciesAPI());

  try {
    const CurrenciesAPIResponse = await getCurrencies();
    dispatch(
      requestCurrenciesAPISuccess(CurrenciesAPIResponse),
    );
  } catch (error) {
    dispatch(
      requestCurrenciesAPIError(error),
    );
  }
};

export const saveExpense = (expenses) => ({
  type: SAVE_EXPENSE,
  expenses,
});
