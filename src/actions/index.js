// Coloque aqui suas actions

// constantes de referencia para chamar na action
const USR_LOGIN = 'USR_LOGIN';
const ADDCURR = 'ADDCURR';
const ADDEXP = 'ADDEXP';
const DELEXP = 'DELEXP';
const ENTER_EDIT = 'ENTER_EDIT';
const EXIT_EDIT = 'EXIT_EDIT';
const EDITEXP = 'EDITEXP';

export function login(payload) {
  return {
    type: USR_LOGIN,
    payload,
  };
}

export function addCurrency(payload) {
  return {
    type: ADDCURR,
    payload,
  };
}
export function addExpense(payload) {
  return {
    type: ADDEXP,
    payload,
  };
}
export function delExpense(id) {
  return {
    type: 'WALLET_DELEXP',
    payload: id,
  };
}
export function editExpense(payload) {
  return {
    type: 'WALLET_EDITEXP',
    payload,
  };
}

export function enterEditMode(id) {
  return {
    type: 'WALLET_ENTER_EDIT_MODE',
    id,
  };
}
export function exitEditMode() {
  return {
    type: 'WALLET_EXIT_EDIT_MODE',
  };
}
