// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  value: 0,
  currency: 'USD',
  method: '',
  tag: '',
  description: '',
  currencies: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state,
      currencies: action.payload.currencies };
  default:
    return state;
  }
}
