import {
  EXPENSES,
  REQUEST_CURRENCIES,
  REQUEST_SUCCESS,
  REQUEST_FAIL,
} from '../actions/index';

const INIT_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
};

function walletReducer(state = INIT_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, isFetching: true };
  case REQUEST_SUCCESS:
    return { ...state, currencies: action.currencies, isFetching: false };
  case REQUEST_FAIL:
    return { ...state, isFetching: false, error: action.error };
  case EXPENSES:
    return { ...state, expenses: [...state.expenses, action.expenses] };
  default:
    return state;
  }
}

export default walletReducer;
