export const LOGIN = 'LOGIN';
export const ADD_NEW_EXPENSE = 'ADD_NEW_EXPENSE';

export const login = (state) => ({
  type: LOGIN,
  email: state.email,
});
export const addNewExpense = (state) => ({
  type: ADD_NEW_EXPENSE,
  expense: state,
});
