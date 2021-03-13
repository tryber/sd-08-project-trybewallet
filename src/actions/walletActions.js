export function addExpense(expense) {
  return {
    type: 'ADD_EXPENSE',
    payload: expense,
  };
}

export function setCurrencies(currencies) {
  return {
    type: 'SET_CURRENCIES',
    payload: currencies,
  };
}
