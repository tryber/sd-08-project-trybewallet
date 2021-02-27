const INITIAL_STATE = {
  isFetching: false,
  currency: {},
  error: '',
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_CURRENCY':
    return { ...state, isFetching: true };
  case 'RECEIVE_CURRENCY':
    return { ...state, currency: action.currency, isFetching: false };
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.expenses] };
  default:
    return state;
  }
}

export default wallet;
