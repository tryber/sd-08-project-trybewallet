// Coloque aqui suas actions
import { getCurrentCurrency } from '../services/currencyAPI';

export const SAVE_EMAIL = 'SAVE_EMAIL';

export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const REQUEST_CURRENCY_SUCCESS = 'REQUEST_CURRENCY_SUCCESS';
export const REQUEST_CURRENCY_ERROR = 'REQUEST_CURRENCY_ERROR';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: {
    email,
  },
});

export const requestCurrency = () => ({
  type: REQUEST_CURRENCY,
  payload: {
    isFetching: true,
  },
});

export const requestCurrencySuccess = (currencies) => ({
  type: REQUEST_CURRENCY_SUCCESS,
  payload: {
    ...currencies,
    isFetching: false,
  },
});

export const requestCurrencyError = (error) => ({
  type: REQUEST_CURRENCY_ERROR,
  payload: {
    error,
    isFetching: false,
  },
});

// Thunk
export const getCurrency = () => (dispatch) => {
  // fetch
  dispatch(requestCurrency());
  getCurrentCurrency()
    .then((currencyResponse) => dispatch(
      requestCurrencySuccess(Object.keys(currencyResponse)),
    ))
    .catch((currencyError) => dispatch(
      requestCurrencyError(currencyError),
    ));
  // dispatch() - escrever no state
};
