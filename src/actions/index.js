// Coloque aqui suas actions
import {
  ADD_LOGIN,
  URL,
  GET_CURRENCIES,
  ERROR,
  FLAG,
  GET_CURRENCIES_ADD_EXPENDITURE,
} from '../const';

export const dataLogin = (data) => ({
  type: ADD_LOGIN,
  data,
});

export const fetching = () => ({
  type: FLAG,
  isFetching: true,
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
    function onError(error) {
      dispatch({ type: ERROR, error });
      return error;
    }
    try {
      const success = await fetch(URL);
      const json = await success.json();
      return onSuccess(json);
    } catch (error) {
      return onError(error);
    }
  };
}
