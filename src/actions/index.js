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
    type: REQUEST_CURRENCY,
    currency,
  };
}

export function saveData(expense) {
  return {
    // d: console.log(expense),
    type: SAVE_DATA,
    expense,
  };
}
