// Coloque aqui suas actions
import {
  ADD_LOGIN,
  DEL_EXPENSE,
  EDIT_EXPENSE,
  URL,
  GET_CURRENCIES,
  GET_CURRENCIES_ADD_EXPENDITURE,
} from '../const';

export const dataLogin = (data) => ({
  type: ADD_LOGIN,
  data,
});

export const deleteExpense = (expense) => ({
  type: DEL_EXPENSE,
  expense,
});

export const editing = (editExpense) => ({
  type: EDIT_EXPENSE,
  editExpense,
});

export function fetchCurrency(expenses = {}, saving = false) {
  return async (dispatch) => {
    function onSuccess(success) {
      if (saving) {
        dispatch({
          type: GET_CURRENCIES_ADD_EXPENDITURE,
          exchange: success,
          expenses,
        });
      } else {
        dispatch({
          type: GET_CURRENCIES,
          currencies: success,
        });
      }
      return success;
    }
    const success = await fetch(URL);
    const json = await success.json();
    return onSuccess(json);
  };
}
