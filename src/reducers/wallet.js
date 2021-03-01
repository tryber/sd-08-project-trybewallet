import { REQUEST_API,
  REQUEST_API_SUCCESS,
  REQUEST_API_ERROR,
  SAVE_EXPENSE,
  DELETE_EXPENSE }
  from '../actions';

const INITIAL_VALUE = {
  currencies: [],
  expenses: [],
};

const wallet = (
  state = INITIAL_VALUE,
  { type, payload },
) => {
  switch (type) {
  case REQUEST_API:
    return {
      ...state,
      isFetching: payload.isFetching,
    };
  case REQUEST_API_SUCCESS:
    return {
      ...state,
      currencies: payload.data,
      isFetching: payload.isFetching,
    };
  case REQUEST_API_ERROR:
    return {
      ...state,
      error: payload.error,
      isFetching: payload.isFetching,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, payload.expenses],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses.filter((expense) => expense.id !== payload.expenses.id),
      ],
    };
  default:
    return state;
  }
};

export default wallet;
