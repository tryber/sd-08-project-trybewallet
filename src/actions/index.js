export const USER_EMAIL = 'USER_EMAIL';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const SAVE_DATA = 'SAVE_DATA';
export const EXCLUDES_DATA = 'EXCLUDES_DATA';
export const EDIT_DATA = 'EDIT_DATA';
export const SET_EDIT_DATA = 'SET_EDIT_DATA';

export function userEmail(email) {
  return {
    type: USER_EMAIL,
    payload: email,
  };
}

export function requestCurrency(currency) {
  return {
    type: REQUEST_CURRENCY,
    currency,
  };
}

export function saveData(expense) {
  return {
    type: SAVE_DATA,
    expense,
  };
}

export function excludesData(excludeExpense) {
  return {
    type: EXCLUDES_DATA,
    excludeExpense,
  };
}

export function editData(idToEdit) {
  return {
    type: EDIT_DATA,
    idToEdit,
  };
}

export function setEditData(save) {
  return {
    type: SET_EDIT_DATA,
    save,
  };
}
