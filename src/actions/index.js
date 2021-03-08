// Coloque aqui suas actions
export const USER_EMAIL = 'USER_EMAIL';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const SAVE_DATA = 'SAVE_DATA';
export const SAVE_TOTAL = 'SAVE_TOTAL';

export function userEmail(email) {
  return {
    type: USER_EMAIL,
    payload: email,
  };
}

export function requestCurrency(currency) {
  return {
    // c: console.log(currency),
    type: REQUEST_CURRENCY,
    currency,
  };
}

export function saveData(expense) {
  return {
    d: console.log(expense),
    type: SAVE_DATA,
    expense,
  };
}

export function saveTotal(sum) {
  return {
    // e: console.log(sum),
    type: SAVE_TOTAL,
    sum,
  };
}

export function fetchCurrency() {
  return async (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currency) => dispatch(requestCurrency(currency)));
}
