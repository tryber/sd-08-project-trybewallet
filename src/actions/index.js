// Coloque aqui suas actions
import * as ActionTypes from '../common/ActionTypes';

export function login(payload) {
  return {
    type: ActionTypes.USER_LOGIN,
    payload,
  };
}

export function addExpense(payload) {
  return {
    type: ActionTypes.WALLET_ADDEXP,
    payload,
  };
}
