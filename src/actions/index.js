// Coloque aqui suas actions
export const addEmail = (value) => ({
  type: 'ADD_ELEMENT',
  value,
});

const requestCurrency = () => ({
  type: 'REQUEST_CURRENCY',
});

const receiveCurrency = (currencies) => ({
  type: 'RECEIVE_CURRENCY',
  currencies,
});

export const addExpense = (array) => ({
  type: 'ADD_EXPENSE',
  expenses: array,
});

export function fetchCurrency() {
  return (dispatch) => {
    dispatch(requestCurrency());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => dispatch(receiveCurrency(currencies)));
  };
}
