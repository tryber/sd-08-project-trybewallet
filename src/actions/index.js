export const LOGIN = 'LOGIN';
export const ADDEXPENSE = 'ADDEXPENSE';
export const DELEXPENSE = 'DELEXPENSE';
export const EDITEXPENSE = 'EDITEXPENSE';
export const EDITREQUEST = 'EDITSTATUS';

export const login = (email) => ({
  type: LOGIN,
  email,
});
export const addExpense = (objectExpense) => ({
  type: ADDEXPENSE,
  objectExpense,
});
export const delExpense = (id) => ({
  type: DELEXPENSE,
  id,
});

export const editExpense = (id, objectExpense) => ({
  type: EDITEXPENSE,
  id,
  objectExpense,
});

export const editRequest = (id, boolean) => ({
  type: EDITREQUEST,
  id,
  boolean,
});
