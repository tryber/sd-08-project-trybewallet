// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { TYPES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  newExpenses: [],
  totalSpend: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TYPES.GET_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.payload),
    };
  default:
    return state;
  }
};

export default wallet;
