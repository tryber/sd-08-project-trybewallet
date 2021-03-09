// Coloque aqui suas actions
export const USER_EMAIL = 'USER_EMAIL';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const ADD_EXPENSES = 'ADD_EXPENSES';

export function userEmail(email) {
  return {
    type: USER_EMAIL,
    payload: email,
  };
}

export function requestCurrency(payload) {
  return {
    // c: console.log(payload),
    type: REQUEST_CURRENCY,
    payload,
  };
}

export function addExpenses(expenses) {
  return {
    type: ADD_EXPENSES,
    payload: expenses,
  };
}

// export function fetchCurrency() {
//   return async (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
//     .then((response) => response.json())
//     .then((currency) => dispatch(requestCurrency(currency)));
// }
