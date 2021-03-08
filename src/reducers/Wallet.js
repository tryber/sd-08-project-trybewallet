// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  SAVE_CURRENCIES,
  ADD_EXPENSE,
  REMOVE_EXPENSE,

} from '../actions/Wallet';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  idCount: 0,
};

const addExpense = (state = INITIAL_STATE, action) => {
  const { idCount, expenses } = state;
  const expense = {
    id: idCount,
    ...action.expenses,
  };
  return {
    ...state,
    expenses: [
      ...expenses,
      expense,
    ],
    idCount: idCount + 1,
  };
};

const removeExpense = (state = INITIAL_STATE, action) => ({
  ...state,
  expenses: state.expenses.filter((expense) => expense.id !== action.payload),
});

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case ADD_EXPENSE:
    return addExpense(state, action);
  case REMOVE_EXPENSE:
    return removeExpense(state, action);
  default:
    return state;
  }
};

export default wallet;
