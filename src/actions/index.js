import getAPI from '../services';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ADD_DESPESA = 'ADD_DESPESA';
export const GET_CURRENCY = 'GET_CURRENCY';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const user = {
  login: (payload) => ({ type: LOGIN, payload }),
  logout: () => ({ type: LOGOUT }),
};

export const wallet = {
  addDespesa: (payload) => ({ type: ADD_DESPESA, payload }),

  deleteExpense: (id) => ({ type: DELETE_EXPENSE, id }),
};

export const cambioFetch = {
  addFetchDespesa: (payload) => async (dispatch) => {
    const moedas = await getAPI();
    dispatch(wallet.addDespesa({ ...payload, exchangeRates: moedas }));
  },
};
