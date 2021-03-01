// Coloque aqui suas actions

const USER_LOGIN = 'USER_LOGIN';
const WALLET_ADDCURR = 'WALLET_ADDCURR';
const WALLET_ADDEXP = 'WALLET_ADDEXP';
const WALLET_DELEXP = 'WALLET_DELEXP';
const WALLET_EDITEXP = 'WALLET_EDITEXP';
const WALLET_ENTER_EDIT_MODE = 'WALLET_ENTER_EDIT_MODE';
const WALLET_EXIT_EDIT_MODE = 'WALLET_EXIT_EDIT_MODE';

export function login(payload) {
  return {
    type: USER_LOGIN,
    payload,
  };
}

export function addCurrency(payload) {
  return {
    type: WALLET_ADDCURR,
    payload,
  };
}
export function addExpense(payload) {
  return {
    type: WALLET_ADDEXP,
    payload,
  };
}
export function delExpense(id) {
  return {
    type: WALLET_DELEXP,
    payload: id,
  };
}
export function editExpense(payload) {
  return {
    type: WALLET_EDITEXP,
    payload,
  };
}

export function enterEditMode(id) {
  return {
    type: WALLET_ENTER_EDIT_MODE,
    id,
  };
}
export function exitEditMode() {
  return {
    type: WALLET_EXIT_EDIT_MODE,
  };
}
