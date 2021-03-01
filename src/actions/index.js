// Coloque aqui suas actions
const LOGIN = 'LOGIN';
const ADD_EXPENSE = 'ADD_EXPENSE';
const DELETE_EXPENSE = 'DELETE_EXPENSE';

export function login(email) {
  return {
    type: LOGIN,
    payload: {
      email,
    },
  };
}

export function addExpense(expense, convertedValue) {
  return {
    type: ADD_EXPENSE,
    payload: {
      expense,
      convertedValue,
    },
  };
}

export function removeExpense(id) {
  return {
    type: DELETE_EXPENSE,
    payload: {
      id,
    },
  };
}

export function fetchExpense(currentExpense) {
  return async (dispatch) => {
    const coinsInfo = await fetch('https://economia.awesomeapi.com.br/json/all');
    const coinsJson = await coinsInfo.json();
    const coinsArray = Object.values(coinsJson);
    const expenseCoin = coinsArray.find((coin) => coin.code === currentExpense.currency);
    const convertedValue = expenseCoin.ask * currentExpense.value;
    const expense = {
      ...currentExpense,
      exchangeRates: { ...coinsJson },
    };
    dispatch(addExpense(expense, convertedValue));
  };
}
