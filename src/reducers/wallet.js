// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { EXPENSES } from '../actions';

const initialStateWallet = {
  expenses: [],
};

function wallet(state = initialStateWallet, action) {
  switch (action.type) {
  // case USER:
  //   return { ...state, email: action.value.email, password: action.value.password };
  case EXPENSES:
    return { ...state, expenses: action.value };
  default:
    return state;
  }
}

export default wallet;
