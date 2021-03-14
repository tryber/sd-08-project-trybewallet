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

export function deleteExpense(id) {
  return {
    type: 'DELETE_EXPENSE',
    payload: id,
  };
}
