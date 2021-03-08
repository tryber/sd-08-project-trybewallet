export const GET_EMAIL = 'GET_EMAIL';

export const getEmail = (email) => ({
  type: GET_EMAIL,
  payload: email,
});

export const ADD_EXPENSE = 'ADD_EXPENSE';

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});
