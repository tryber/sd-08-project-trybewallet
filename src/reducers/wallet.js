import {
  REQUEST_START,
  REQUEST_SUCCESS,
  REQUEST_FAIL,
  SAVE_EXPENSE,
  DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE_WALLET, action) {
  switch (action.type) {
  case REQUEST_START:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_SUCCESS:
    return {
      ...state,
      isFetching: false,
      currencies: [action.currencies],
    };
  case REQUEST_FAIL:
    return {
      ...state,
      isFetching: false,
      error: action.error,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== action.expense.id)],
    };
  default:
    return state;
  }
}
