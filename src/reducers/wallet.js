// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  expenses: [],
};
const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'REQUEST_API':
    return ({ ...state, isFetching: true });
  case 'GET_EXPENSES':
    return { ...state,
      expenses: [...state.expenses, action.payload],
      isFetching: false };
  case 'FAILED_REQUEST':
    return { ...state, error: action.payload, isFetching: false };
  default:
    return state;
  }
};

export default expensesReducer;
