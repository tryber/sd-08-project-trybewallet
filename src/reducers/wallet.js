// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SAVE_CURR, ADD_EXP, DEL_EXP } from '../actions';

const initialWalletState = {
  currencies: {},
  expenses: [],
};

function wallet(state = initialWalletState, action) {
  switch (action.type) {
  case SAVE_CURR:
    return { ...state, currencies: action.payload };
  case ADD_EXP:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case DEL_EXP:
    return { ...state, expenses: [...action.payload] };
  default:
    return state;
  }
}

export default wallet;
