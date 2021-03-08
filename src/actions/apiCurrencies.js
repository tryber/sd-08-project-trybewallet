import types from './types';

export const saveLogin = (email) => (
  {
    type: types.SAVE_LOGIN,
    email,
  }
);

export const currenciesRequest = () => (
  {
    type: types.CURRENCIES_REQUEST,
  }
);

export const currenciesRequestSucceed = (currencies) => (
  {
    type: types.CURRENCIES_REQUEST_SUCCEED,
    currencies,
  }
);

export const currenciesRequestFailed = (error) => (
  {
    type: types.CURRENCIES_REQUEST_FAILED,
    error,
  }
);

export default function apiCurrencies() {
  return async (dispatch) => {
    try {
      dispatch(currenciesRequest());
      const URL = 'https://economia.awesomeapi.com.br/json/all';
      const currenciesJson = await fetch(URL)
        .then((response) => response.json());
      const currencies = Object.keys(currenciesJson)
        .filter((currency) => currency !== 'USDT');
      return dispatch(currenciesRequestSucceed(currencies));
    } catch (error) {
      return dispatch(currenciesRequestFailed(error));
    }
  };
}
