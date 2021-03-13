// Coloque aqui suas actions
export const USER_EMAIL = 'USER_EMAIL';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

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

export function deleteExpense(expense) {
  return {
    // c: console.log(expense),
    type: DELETE_EXPENSE,
    payload: expense,
  };
}

export function editExpense(expense) {
  return {
    type: EDIT_EXPENSE,
    payload: expense,
  };
}

export function saveExpense(expense) {
  return {
    // c: console.log(expense),
    type: SAVE_EXPENSE,
    payload: expense,
  };
}
