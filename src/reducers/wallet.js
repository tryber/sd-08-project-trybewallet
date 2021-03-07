import { ADD_EXPENSE, FETCH_CURRENCIES } from '../actions/types';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initial = {
  currencies: [],
  expenses: [],
};

function wallet(state = initial, action) {
  switch (action.type) {
  case FETCH_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  default:
    return state;
  }
}

export default wallet;
