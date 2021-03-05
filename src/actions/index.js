// User Actions

export const setUser = (email, password) => ({
  type: 'SET_USER',
  email,
  password,
});

// Wallet Actions

const REQUEST_API = () => ({ type: 'REQUEST_API' });
const RECEIVE_CURRENCIES = (currencies) => ({
  type: 'RECEIVE_CURRENCIES',
  currencies,
});

export const fetchCurrencies = () => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  return (dispatch) => {
    dispatch(REQUEST_API());
    return fetch(URL)
      .then((response) => response.json())
      .then((data) => dispatch(RECEIVE_CURRENCIES(data)));
  };
};

export const AddAnExpenseAction = (newExpense) => ({
  type: 'ADD_AN_EXPENSE',
  newExpense,
});
