// Coloque aqui suas actions
const LOGIN = 'LOGIN';
const ADD_EXPENSE = 'ADD_EXPENSE';

const login = ({ email }) => ({
  type: LOGIN,
  payload: { email },
});

const addExpense = ({ id, exp, des, cur, met, tag }) => ({
  type: ADD_EXPENSE,
  payload: { id, exp, des, cur, met, tag },
});

export { LOGIN, login, ADD_EXPENSE, addExpense };
