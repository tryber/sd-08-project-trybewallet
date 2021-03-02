// Coloque aqui suas actions

// constantes de referencia para chamar na action

export function login(payload) {
  return {
    type: 'USR_LOGIN',
    payload,
  };
}

export function addCurrency(payload) {
  return {
    type: 'ADDCURR',
    payload,
  };
}
export function addExpense(payload) {
  return {
    type: 'ADDEXP',
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
