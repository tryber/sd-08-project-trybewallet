const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
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
  case 'EDIT':
    return {
      ...state,
      editor: true,
    };
  case 'EDIT_BUTTON':
    return {
      ...state,
      expenses: action.payload.state,
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
