import types from './types';

function addExpense(newExpense) {
  return {
    type: types.ADD_EXPENSE,
    payload: newExpense,
  };
}

function addExpenseAction(expense) {
  return (dispatch) => {
    const url = ('https://economia.awesomeapi.com.br/json/all');
    const currentRates = fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const exchangeRates = {};
        const filteredData = Object.entries(data)
          .filter((currency) => currency[0] !== 'USDT');
        filteredData
          .forEach((item) => Object.assign(exchangeRates, { [item[0]]: item[1] }));

        const expenseToAdd = {
          ...expense,
          exchangeRates,
        };

        dispatch(addExpense(expenseToAdd));
      });
    return currentRates;
  };
}

export default addExpenseAction;
