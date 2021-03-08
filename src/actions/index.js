import { SAVE_EMAIL, REQUEST_TRY,
  REQUEST_SUCCESS, REQUEST_FAIL,
  SAVE_EXPENSE } from '../const';
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
