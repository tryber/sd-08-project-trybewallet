export const SEND_EMAIL = 'SEND_EMAIL';

const dispatchEmail = (email) => ({
  type: SEND_EMAIL,
  email,
});

export const USER_EMAIL = 'USER_EMAIL';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export function userEmail(email) {
  return {
    type: USER_EMAIL,
    payload: email,
  };
}

export function requestCurrency(payload) {
  return {
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

export function deleteExpense(id) {
  return {
    type: DELETE_EXPENSE,
    payload: id,
  };
}

export function saveExpense(expense) {
  return {
    type: SAVE_EXPENSE,
    payload: expense,
  };
}

export function editExpense(expense) {
  return {
    type: EDIT_EXPENSE,
    payload: expense,
  };
}
export default dispatchEmail;
