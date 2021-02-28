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

export function addExpense(expense, conversionRate, convertedValue) {
  return {
    type: ADD_EXPENSE,
    payload: {
      expense,
      conversionRate,
      convertedValue,
    },
  };
}

export function fetchExpense(currentExpense) {
  return async (dispatch) => {
    const coinsInfo = await fetch('https://economia.awesomeapi.com.br/json/all');
    const coinsJson = await coinsInfo.json();
    const coinsArray = Object.values(coinsJson);
    // const coinsList = coinsArray
    //   .filter((coin) => coin.codein !== 'BRLT')
    //   .map((coin) => ({ [coin.code]: coin }));
    const expense = {
      ...currentExpense,
      exchangeRates: { ...coinsJson },
    };
    dispatch(addExpense(expense));
  };
}
