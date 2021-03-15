import { SAVE_EMAIL, REQUEST_TRY,
  REQUEST_SUCCESS, REQUEST_FAIL, REMOVE_EXPENSE,
  SAVE_EXPENSE, EDITING_EXPENSE, EDITED_EXPENSE } from '../const';
import fetchApiCurrencies from '../services';

export const saveEmail = (value) => ({
  type: SAVE_EMAIL,
  value,
});

const requestTryApi = () => ({
  type: REQUEST_TRY,
});

const requestSucessApi = (currencies) => ({
  type: REQUEST_SUCCESS,
  currencies,
});

const requestFailApi = (error) => ({
  type: REQUEST_FAIL,
  error,
});

export const responseCurrencies = () => async (dispatch) => {
  try {
    dispatch(requestTryApi());

    const request = await fetchApiCurrencies();

    dispatch(requestSucessApi(request));
  } catch (error) {
    dispatch(requestFailApi(error));
  }
};

export const newExpenseSave = (expenses) => ({
  type: SAVE_EXPENSE,
  expenses,
});

export const removeExpense = (expense) => ({
  type: REMOVE_EXPENSE,
  expense,
});
export const editExpense = (expense) => ({
  type: EDITING_EXPENSE,
  expense,
});

export const editedExpenseSave = (expense) => ({
  type: EDITED_EXPENSE,
  expense,
});
