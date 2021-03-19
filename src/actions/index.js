// Coloque aqui suas actions
import types from '../types';

async function fetchExchanges() {
  const responseAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
  const exchanges = await responseAPI.json();
  return exchanges;
}

export const changeEmail = (email) => ({
  type: types.CHANGE_EMAIL,
  email,
});

export const requestCoins = (payload) => ({
  type: types.REQUEST_COIN,
  payload,
});

export const failedRequest = (error) => ({
  type: types.FAILED_REQUEST,
  error,
});

export const addExpense = (expense) => async (dispatch) => {
  const exchanges = await fetchExchanges();
  dispatch({
    type: types.ADD_EXPENSE,
    expense: {
      ...expense,
      exchangeRates: exchanges,
    },
  });
};

export const deleteExpense = (expense) => ({
  type: types.DELETE_EXPENSE,
  expense,
});

export const fetchCoins = () => async (dispatch) => {
  const currencies = await fetchExchanges();
  dispatch(requestCoins(currencies));
};
