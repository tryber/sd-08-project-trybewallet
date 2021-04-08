import getCoin from '../services/getCoin';
import { RECEIVE_COIN,
  DELETE_EXPENSE, EDIT_EXPENSE,
  INFO_WALLET,
  ADD_EDIT_EXPENSE,
  EDIT_STATUS } from './index';

export const infoWalletAction2 = (payload) => ({
  type: INFO_WALLET,
  payload,
});

export const infoWalletAction = (info) => async (dispatch) => {
  const thunkReturn = await getCoin();
  info.exchangeRates = thunkReturn;
  dispatch(infoWalletAction2(info));
};

export const receiveCoin = (payload) => ({
  type: RECEIVE_COIN,
  payload,
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

export const editStatus = (payload) => ({
  type: EDIT_STATUS,
  payload,
});
