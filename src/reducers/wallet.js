// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FET_API, EXPENSE, REMOVE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FET_API:
    return { ...state, currencies: Object.keys(action.payload) };
  case EXPENSE:
    return ({
      ...state,
      expenses: [...state.expenses, action.value],
    });
  case REMOVE:
    return ({
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    });
  default:
    return state;
  }
};
