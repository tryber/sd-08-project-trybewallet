// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};
const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_API':
    return {
      ...state,
      isFetching: action.payload.isFetching,
    };
  case 'REQUEST_API_SUCCESS':
    return {
      ...state,
      currencies: action.payload.coins,
      isFetching: action.payload.isFetching,
    };
  case 'REQUEST_API_ERROR':
    return {
      ...state,
      error: action.payload.error,
      isFetching: action.payload.isFetching,
    };

  case 'REQ_FOR_ADD_EXPENSE':
    return {
      ...state,
      isFetching: true,
    };
  case 'REQ_FOR_ADD_EXPENSE_SUCCESS':
    return {
      ...state,
      expenses: [...state.expenses, action.payload.coins],
    };
  case 'REQ_FOR_ADD_EXPENSE_ERROR':
    return {
      ...state,
      error: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
