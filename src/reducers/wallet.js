import { ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE, GET_CURRENCIES, START_REQUEST }
  from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: true,
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case START_REQUEST:
    return { ...state, isFetching: payload.isFetching };
  case GET_CURRENCIES:
    return { ...state, currencies: payload.currencies, isFetching: payload.isFetching };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, payload] };
  case EDIT_EXPENSE:
    return state;
  case DELETE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== payload),
    };
  default:
    return state;
  }
};

export default wallet;
