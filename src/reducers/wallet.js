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
  default:
    return state;
  }
};

export default wallet;
