// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_MONEY_TYPE':
    return { ...state, isFetching: true };
  case 'GET_MONEY_TYPE':
    return { ...state, currencies: [action.payload], isFetching: false };
  case 'FAILED_REQUEST_TYPE':
    return { ...state, error: action.payload, isFetching: false };
  case 'SAVE_EXPENSE':
    return { ...state, expenses: state.expenses.concat(action.payload) };
  default:
    return state;
  }
};

export default wallet;
