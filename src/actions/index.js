export const loginUser = (value) => ({ type: 'LOGIN', email: value });

export const addExpenseAction = (expenses) => ({
  type: 'ADD_EXPENSE',
  expenses,
});
export const addEditedExpenseAction = (expenses) => ({
  type: 'EDIT_EXPENSE',
  expenses,
});

export const editExpenseAction = (expense) => ({
  type: 'IS_EDITING',
  selectedExpense: expense,
});

export const deleteExpenseAction = (newExpenseInstance) => ({
  type: 'DELETE_EXPENSE',
  expenses: newExpenseInstance,
});

export const updateExchange = (exchange) => ({
  type: 'UPDATE_EXCHANGE',
  currencies: Object.keys(exchange).filter((currency) => currency !== 'USDT'),
  exchanges: exchange,
});

export const failedRequest = (error) => ({
  type: 'FAILED_REQUEST', error,
});

export const receiveExchange = (cambioValue) => ({
  type: 'RECEIVE_EXCHANGE_VALUE',
  receiveExchange: cambioValue,

});

export const getExchange = () => async (dispatch) => {
  try {
    const apiResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const endJson = await apiResponse.json();
    dispatch(updateExchange(endJson));
    return endJson;
  } catch (error) {
    return dispatch(failedRequest(error));
  }
};

async function getExchanges() {
  try {
    const apiResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const endJson = await apiResponse.json();
    return endJson;
  } catch (error) {
    return error;
  }
}

export const addExpense = (expense) => async (dispatch) => {
  const exchanges = await getExchanges();
  expense.exchangeRates = exchanges;
  dispatch(addExpenseAction(expense));
};

export const deleteExpense = (id, expenses) => async (dispatch) => {
  const newExpenseInstance = expenses.filter((expense) => expense.id !== id);
  dispatch(deleteExpenseAction(newExpenseInstance));
};

export const addEditedExpense = (selectedExpense, expenses) => async (dispatch) => {
  const editedIndex = expenses.findIndex((i) => i.id === selectedExpense.id);
  expenses[editedIndex] = selectedExpense;
  dispatch(addEditedExpenseAction(expenses));
};
