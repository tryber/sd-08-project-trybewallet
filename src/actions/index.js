// Coloque aqui suas actions
import * as ActionTypes from '../common/ActionTypes';

export function login(payload) {
  return {
    type: ActionTypes.USER_LOGIN,
    payload,
  };
}

export function logout() {
  return {
    type: ActionTypes.USER_LOGOUT,
  };
}
