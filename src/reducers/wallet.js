// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET } from '../actions';

const initialStateWallet = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = initialStateWallet, action) {
  switch (action.type) {
  case WALLET:
    return { ...state, currencies: action.payload };
  default:
    return state;
  }
}
