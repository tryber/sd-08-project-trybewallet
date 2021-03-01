const INITIAL_STATE = {
  isFetching: true,
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_CURRENCY':
    return { ...state, isFetching: true };
  case 'RECEIVE_CURRENCY':
    return { ...state, currencies: action.currencies, isFetching: false };
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.expenses] };
  case 'DELETE_EXPENSE':
    // console.log('DELETE_EXPENSE');
    // console.log(state.expenses);
    // console.log(state.expenses[0].id);
    // console.log(action.idExpense);
    // console.log(state.expenses.filter((expense) => parseFloat(action.idExpense) !== expense.id));
    return { ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== parseFloat(action.idExpense),
      ) };
  default:
    return state;
  }
}

export default wallet;
