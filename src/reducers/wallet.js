// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSE, SAVE_CURRENCIES } from '../actions';

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

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case ADD_EXPENSE:
    return addExpense(state, action);
  default:
    return state;
  }
};

export default wallet;
