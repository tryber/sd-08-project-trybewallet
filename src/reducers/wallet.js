const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.payload] };
  case 'SET_CURRENCIES':
    return { ...state, currencies: action.payload };
  case 'DELETE_EXPENSE':
    return { // ...state, expenses: action.payload };
      ...state,
      expenses: state.expenses.filter(
        (expense) => parseFloat(expense.id) !== parseFloat(action.payload),
      ) };
  default:
    return state;
  }
}

export default wallet;
