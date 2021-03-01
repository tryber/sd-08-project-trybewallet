const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'EXCHANGE_REQUEST_API_SUCCESSFUL':
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  case 'EXCHANGE_REQUEST_API_FAILED':
    return {
      ...state,
      error: action.payload.error,
    };
  case 'EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'DELETE':
    return {
      ...state,
      expenses: state.expenses.filter((order) => order.id !== action.payload.id),
    };
  default:
    return state;
  }
};

export default wallet;
