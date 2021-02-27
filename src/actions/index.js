export const STORE_EMAIL = 'STORE_EMAIL';
export const REFRESH_CURRENCIES = 'REFRESH_CURRENCIES';
export const FAILED_FETCH_CURRENCIES = 'FAILED_FETCH_CURRENCIES';

export function storeEmail(email) {
  return {
    type: STORE_EMAIL,
    payload: {
      email,
    },
  };
}

function refreshCurrencies(currencies) {
  return {
    type: REFRESH_CURRENCIES,
    payload: {
      currencies,
    },
  };
}

function failedFetchCurrencies(error) {
  return {
    type: FAILED_FETCH_CURRENCIES,
    payload: {
      error,
    },
  };
}

export function fetchCurrencies() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currencies = await response.json();
      return dispatch(refreshCurrencies(currencies));
    } catch (error) {
      return dispatch(failedFetchCurrencies(error));
    }
  };
}
