import { ADD_EXPENSE } from './types';

function addExpense(expense) {
  return {
    type: ADD_EXPENSE,
    payload: expense,
  };
}

function addExpenseAction(expense) {
  return (dispatch) => {
    const endpoint = ('https://economia.awesomeapi.com.br/json/all');
    const currentExchange = fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const currencies = Object.entries(data);
        const filtered = currencies.filter((item) => item[0] !== 'USDT');
        const expenseToAdd = {
          ...expense,
          exchangeRates: Object.assign(filtered, {}),
        };
        dispatch(addExpense(expenseToAdd));
      });
    return currentExchange;
  };
}

export default addExpenseAction;
