// Coloque aqui suas actions
const LOGIN = 'LOGIN';
const ADD_EXPENSE = 'ADD_EXPENSE';
const DEL_EXPENSE = 'DEL_EXPENSE';

const login = ({ email }) => ({
  type: LOGIN,
  payload: { email },
});

const addExpense = ({ id, exp, des, cur, met, tag }) => ({
  type: ADD_EXPENSE,
  payload: { id, exp, des, cur, met, tag },
});

const delExpense = (item) => ({
  type: DEL_EXPENSE,
  item,
});

export { LOGIN, login, ADD_EXPENSE, addExpense, DEL_EXPENSE, delExpense };
