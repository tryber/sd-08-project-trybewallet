export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';

const requestCurrencies = (currencies) => ({
  type: REQUEST_CURRENCIES,
  currencies,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
  a: console.log(expense),
});

// action creator returns a function, available in redux-thunk package
export function fetchCurrencies() {
  return async (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currencies) => dispatch(requestCurrencies(Object.values(currencies))));
}
