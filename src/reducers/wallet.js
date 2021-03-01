import {
  ADD_EXPENSE,
  DEL_EXPENSE,
  REQUEST_API,
  REQUEST_API_FAIL,
  REQUEST_API_SUCCESS,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFatching: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, action.payload] };
  case DEL_EXPENSE:
    return { ...state,
      expenses: [...state.expenses
        .filter((expense) => expense.id !== parseFloat(action.payload))] };
  case REQUEST_API:
    return { ...state, isFatching: action.payload.isFatching };
  case REQUEST_API_SUCCESS:
    return { ...state,
      currencies: action.payload.currencies,
      isFatching: action.payload.isFatching };
  case REQUEST_API_FAIL:
    return { ...state,
      error: action.payload.error,
      isFatching: action.payload.isFatching };
  default:
    return state;
  }
};

export default wallet;
