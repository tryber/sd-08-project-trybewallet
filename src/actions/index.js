export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_API_CURRENCIES = 'REQUEST_API_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const login = (email) => ({
  type: LOGIN,
  email,
});

const requestApiCurrencies = () => ({
  type: REQUEST_API_CURRENCIES,
});

const getCurrencies = (data) => ({
  type: GET_CURRENCIES,
  data,
});

export const fetchCurrencies = () => (
  async (dispatch) => {
    dispatch(requestApiCurrencies());
    const data = await fetch('https://economia.awesomeapi.com.br/json/all');
    const dataJson = await data.json();
    const currencies = Object.keys(dataJson).filter((currency) => currency !== 'USDT');
    dispatch(getCurrencies(currencies));
  }
);

const addExpense = (id, data) => ({
  type: ADD_EXPENSE,
  payload: {
    id,
    ...data,
    // total: data.value * data.exchangeRates[data.currency].ask,
  },
});

export const getExchangeAndAddToExpense = (id, dataInput) => (
  async (dispatch) => {
    dispatch(requestApiCurrencies);
    const data = await fetch('https://economia.awesomeapi.com.br/json/all');
    const dataJson = await data.json();
    const expense = { ...dataInput, exchangeRates: dataJson };
    dispatch(addExpense(id, expense));
  }
);
