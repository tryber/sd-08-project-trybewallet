import { RECEIVE_COIN, INFO_WALLET } from '../actions';

const INITIAL_STATE = {
  currencies: {},
  expenses: [],
};

function CoinReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECEIVE_COIN:
    return { ...state, currencies: action.payload };
  case INFO_WALLET:
    return { ...state, expenses: [...state.expenses, action.payload] };
  default:
    return state;
  }
}
export default CoinReducer;
