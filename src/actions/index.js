export const loginAction = (value) => ({
  type: 'LOGIN',
  value: {
    email: value,
  },
});

const requestCoins = () => ({
  type: 'REQUEST_COINS',
});

const recieveCoins = (value) => ({
  type: 'RECIEVE_COINS',
  value,
});

export function fetchCoins() {
  return (dispatch) => {
    dispatch(requestCoins());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((coins) => dispatch(recieveCoins(coins)));
  };
}

export const addExpense = (value) => ({
  type: 'ADD_EXPENSE',
  value,
});

export const updatesExpending = (value) => ({
  type: 'UPDATES_EXPENDING',
  value,
});
