// Coloque aqui suas actions
const LOGIN = 'LOGIN';
const ADD_EXPENSE = 'ADD_EXPENSE';

export function login(email) {
  return {
    type: LOGIN,
    payload: {
      email,
    },
  };
}

export function addExpense(expense) {
  return {
    type: ADD_EXPENSE,
    payload: {
      expense,
    },
  };
}

export function fetchExpense() {
  return async (dispatch) => {
    const coinsInfo = await fetch('https://economia.awesomeapi.com.br/json/all');
    const coinsJson = await coinsInfo.json();
    const coinsArray = Object.values(coinsJson);
    const coinsList = coinsArray
      .filter((coin) => coin.codein !== 'BRLT');
    const expense = {
      exchangeRates: coinsList,
    };
    dispatch(addExpense(expense));
  };
}
