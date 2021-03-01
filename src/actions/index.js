export const STORE_EMAIL = 'STORE_EMAIL';
export const REFRESH_CURRENCIES = 'REFRESH_CURRENCIES';
export const FAILED_FETCH_CURRENCIES = 'FAILED_FETCH_CURRENCIES';
export const NEW_CURRENCY_UID = 'NEW_CURRENCY_UID';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

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

export function newCurrencyID() {
  return {
    type: NEW_CURRENCY_UID,
  };
}

export function addExpense(expenseObj) {
  return {
    type: ADD_EXPENSE,
    payload: {
      expenseObj,
    },
  };
}

export function deleteExpense(id) {
  return {
    type: DELETE_EXPENSE,
    payload: {
      id,
    },
  };
}
