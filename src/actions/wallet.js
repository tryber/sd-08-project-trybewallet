import getCoin from '../services/getCoin';
import { RECEIVE_COIN, DELETE_EXPENSE } from './index';

export const receiveCoin = (ObjCoins) => ({
  type: RECEIVE_COIN,
  payload: ObjCoins,
});
export function fetchCoin() {
  return (dispatch) => getCoin().then((data) => dispatch(receiveCoin(data)));
}

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});
