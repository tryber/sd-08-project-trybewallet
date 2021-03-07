// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCIES,
  GET_EXPENSES,
  DELETE_EXPENSE,
} from '../actions/constants';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  id: 0,
  total: 0,
};
const getExpenses = (state = INITIAL_STATE, action) => {
  const newExpenses = {
    id: state.id,
    ...action.expenses,
  };
  return {
    ...state,
    expenses: [...state.expenses, newExpenses],
    id: state.id + 1,
  };
};

const deletExpense = (state = INITIAL_STATE, action) => ({
  ...state,
  expenses: state.expenses.filter((expense) => expense.id !== action.id),
});

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, currencies: action.Currencies };
  case GET_EXPENSES:
    return getExpenses(state, action);
  case DELETE_EXPENSE:
    return deletExpense(state, action);
  default:
    return state;
  }
}
