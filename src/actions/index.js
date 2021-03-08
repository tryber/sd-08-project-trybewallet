import { LOGIN } from '../store/consts';
import api from '../services';

export const REQUEST_START = 'REQUEST_START';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAIL = 'REQUEST_FAIL';
export const SALVAR_GASTO = 'SALVAR_GASTO';

export const logar = (email) => ({
  type: LOGIN,
  payload: email,
});

const requestCurrenciesTry = () => ({
  type: REQUEST_START,
});

const requestCurrenciesSuccess = (currencies) => ({
  type: REQUEST_SUCCESS,
  currencies,
});

const requestCurrenciesFail = (error) => ({
  type: REQUEST_FAIL,
  error,
});

export const pegar = () => async (dispatch) => {
  try {
    dispatch(requestCurrenciesTry());

    const currencies = await api();

    dispatch(requestCurrenciesSuccess(currencies));
  } catch (error) {
    dispatch(requestCurrenciesFail(error));
  }
};

export const salvar = (expenses) => ({
  type: SALVAR_GASTO,
  expenses,
});
