import getApiCurrency from '../api';

export const LOGIN = 'LOGIN';
export const SAVE_CURR = 'SAVE_CURR';
export const ADD_EXP = 'ADD_EXP';
export const DEL_EXP = 'DEL_EXP';
export const EDIT = 'EDIT';
export const EDITING = 'EDITING';
export const EDIT_COMPLETE = 'EDIT_COMPLETE';

export const loginUser = ({ email, password }) => ({
  type: LOGIN,
  payload: { email, password },
});

export const saveCurrencies = (obj) => ({
  type: SAVE_CURR,
  payload: obj,
});

export const addExpenses = (obj) => ({
  type: ADD_EXP,
  payload: obj,
});

export const deleteExpense = (obj) => ({
  type: DEL_EXP,
  payload: obj,
});

export const editExpense = (item) => ({
  type: EDIT,
  payload: item,
});

export const statusToFalse = () => ({
  type: EDITING,
});

export const editComplete = () => ({
  type: EDIT_COMPLETE,
});

export const fetchCurrencies = () => async (dispatch) => {
  const currencies = await getApiCurrency();
  delete currencies.USDT;
  return dispatch(saveCurrencies(currencies));
};
