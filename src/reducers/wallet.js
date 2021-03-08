import {
  EXPENSES,
  REQUEST_CURRENCIES,
  REQUEST_SUCCESS,
  REQUEST_FAIL,
  DELETE_EXPENSE,
} from '../actions/index';

const INIT_STATE = {
  currencies: [],
  expenses: [],
  error: '',
};

function walletReducer(state = INIT_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state };
  case REQUEST_SUCCESS:
    return { ...state, currencies: action.currencies };
  case REQUEST_FAIL:
    return { ...state, error: action.error };
  case EXPENSES:
    return { ...state, expenses: [...state.expenses, action.expenses] };
  case DELETE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter((item) => item.id !== action.expenseID) };
  default:
    return state;
  }
}

export default walletReducer;
