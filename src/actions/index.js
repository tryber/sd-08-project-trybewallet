// Coloque aqui suas actions
const LOGIN = 'LOGIN';
const ADD_EXPENSE = 'ADD_EXPENSE';

export function login(email) {
  return {
    type: LOGIN,
    payload: {
      email,
    },
  };
}

export function addExpense(expense) {
  return {
    type: ADD_EXPENSE,
    payload: {
      expense,
    },
  };
}
