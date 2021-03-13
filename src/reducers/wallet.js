import { WALLET } from '../actions';

const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE_WALLET, action) {
  switch (action.type) {
  case WALLET:
    return {
      ...state, currencies: action.payload,
    };
  default:
    return state;
  }
}
