// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currency: [],
};

const wallet = (state = INITIAL_STATE, payload, type) => {
  switch (type) {
  case ADD_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, payload].sort((a, b) => a.id - b.id),
    };
  default:
    return state;
  }
};

export default wallet;
