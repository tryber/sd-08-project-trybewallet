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

export const currenciesRequestSucceed = (currenciesJson, currencies, currenciesList) => (
  {
    type: types.CURRENCIES_REQUEST_SUCCEED,
    currenciesJson,
    currencies,
    currenciesList,
  }
);

export const currenciesRequestFailed = (error) => (
  {
    type: types.CURRENCIES_REQUEST_FAILED,
    error,
  }
);

export function apiCurrencies() {
  return async (dispatch) => {
    try {
      dispatch(currenciesRequest());
      const URL = 'https://economia.awesomeapi.com.br/json/all';
      const currenciesJson = await fetch(URL)
        .then((response) => response.json());
      const currenciesList = Object.keys(currenciesJson)
        .filter((currency) => currency !== 'USDT');
      const currencies = currenciesList.map((currency) => currenciesJson[currency]);
      return dispatch(currenciesRequestSucceed(
        currenciesJson,
        currencies,
        currenciesList,
      ));
    } catch (error) {
      return dispatch(currenciesRequestFailed(error));
    }
  };
}

export const updateExpensesData = (expenses) => (
  {
    type: types.UPDATE_EXPENSES_DATA,
    expenses,
  }
);
