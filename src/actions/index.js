export const ADD_EXPENSE = 'ADD_EXPENSE';
export const LOGIN = 'LOGIN';
export const WALLET = 'WALLET';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const wallet = () => ({
  type: WALLET,
  payload: {
    isFetching: true,
  },
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: {
    currencies,
    isFetching: false,
  },
});

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(wallet());

    const apiResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const apiJson = await apiResponse.json();

    dispatch(getCurrencies(apiJson));
  };
}
