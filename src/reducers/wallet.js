import {
  NEW_EXPENSE,
  DELETE_EXPENSE,
  REQUEST_START,
  REQUEST_CURRENCY,
  REQUEST_FAILED,
} from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
  isFetching: true,
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_START:
    return { ...state, isFetching: payload.isFetching };

  case REQUEST_CURRENCY:
    return {
      ...state,
      currencies: [payload.currencies],
      isFetching: payload.isFetching,
    };

  case NEW_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, payload].sort((a, b) => a.id - b.id),
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== payload),
    };

  case REQUEST_FAILED:
    return {
      ...state,
      isFetching: false,
      error: payload.error,
    };

  default:
    return state;
  }
};

export default wallet;
