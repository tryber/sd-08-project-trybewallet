import { INFO_WALLET } from '../actions';

const INITIAL_STATE = [
];

function InfoWalletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case INFO_WALLET:
    return [...state, action.payload];
  default:
    return state;
  }
}
export default InfoWalletReducer;
