import getCoin from '../services/getCoin';
import { RECEIVE_COIN,
  DELETE_EXPENSE, EDIT_EXPENSE,
  INFO_WALLET,
  ADD_EDIT_EXPENSE } from './index';

export const receiveCoin = (ObjCoins) => ({
  type: RECEIVE_COIN,
  payload: ObjCoins,
});

export const infoWalletAction = (info) => ({
  type: INFO_WALLET,
  payload: info,
});
export function fetchCoin() {
  return (dispatch) => getCoin().then((data) => dispatch(receiveCoin(data)));
}

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const addEditExpense = (payload) => ({
  type: ADD_EDIT_EXPENSE,
  payload,

});
