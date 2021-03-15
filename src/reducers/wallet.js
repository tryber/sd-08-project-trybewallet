import { RECEIVE_COIN } from '../actions';

const INITIAL_STATE = {};

function CoinReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECEIVE_COIN:
    return action.payload;
  default:
    return state;
  }
}
export default CoinReducer;
