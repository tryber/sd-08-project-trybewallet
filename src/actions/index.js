import getCurrenciesValues from '../services/currenciesValuesApi';

export const EMAIL_USER = 'EMAIL_USER';
export const actionEmail = (email) => ({ type: EMAIL_USER, payload: email });

export const REQUEST_CURRENCIES_VALUES = 'REQUEST_CURRENCIES_VALUES';
export const REQUEST_CURRENCIES_VALUES_SUCCESS = 'REQUEST_CURRENCIES_VALUES_SUCCESS';
export const REQUEST_CURRENCIES_VALUES_ERROR = 'REQUEST_CURRENCIES_VALUES_ERROR';

const requestCurrenciesValues = () => ({
  type: REQUEST_CURRENCIES_VALUES,
  payload: {
    isFetching: true,
  },
});

const requestCurrenciesValuesSuccess = (currencies) => ({
  type: REQUEST_CURRENCIES_VALUES_SUCCESS,
  payload: {
    currencies, isFetching: false,
  },
});

const requestCurrenciesValuesError = (error) => ({
  type: REQUEST_CURRENCIES_VALUES_ERROR,
  payload: {
    error, isFetching: false,
  },
});

export const fetchCurrenciesValues = () => async (dispatch) => {
  console.log('fetchCurrenciesValues fui chamada');
  dispatch(requestCurrenciesValues());
  try {
    const currenciesValues = await getCurrenciesValues();
    dispatch(requestCurrenciesValuesSuccess(currenciesValues));
  } catch (error) {
    dispatch(requestCurrenciesValuesError(error));
  }
};
