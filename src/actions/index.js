export const LOGIN = 'LOGIN';
export const ADD_NEW_EXPENSE = 'ADD_NEW_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const login = (state) => ({
  type: LOGIN,
  email: state.email,
});
export const addNewExpense = (state) => ({
  type: ADD_NEW_EXPENSE,
  expense: state,
});

export const removeExpense = (expenseId) => ({
  type: REMOVE_EXPENSE,
  expenseId,
});

export const editExpense = (state) => ({
  type: EDIT_EXPENSE,
  expenseModified: state,
});
