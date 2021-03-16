import * as ActionTypes from '../common/ActionTypes';

export function login(payload) {
  return {
    type: ActionTypes.USER_LOGIN,
    payload,
  };
}

export function addCurrency(payload) {
  return {
    type: ActionTypes.WALLET_ADDCURR,
    payload,
  };
}
export function addExpense(payload) {
  return {
    type: ActionTypes.WALLET_ADDEXP,
    payload,
  };
}
export function delExpense(id) {
  return {
    type: ActionTypes.WALLET_DELEXP,
    payload: id,
  };
}
export function editExpense(payload) {
  return {
    type: ActionTypes.WALLET_EDITEXP,
    payload,
  };
}
