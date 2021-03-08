const initialState = {
  currencies: [],
  expenses: [],
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case 'REQUEST_CURRENCY':
    return {
      ...state,
      isFetching: true,
    };
  case 'GET_CURRENCY':
    return {
      ...state,
      isFetching: false,
      currencies: [action.currencies],
    };
  case 'FAILED_REQUEST':
    return {
      ...state,
      isFetching: false,
      error: action.error,
    };
  case 'SAVE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case 'REMOVE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  default:
    return state;
  }
}

export default wallet;
