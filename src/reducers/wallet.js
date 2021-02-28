import {
  ADD_EXPENSE,
  CONFIRM_EDIT,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  GET_CURRENCIES,
  START_REQUEST,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editTarget: {},
  isFetching: true,
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case START_REQUEST:
    return { ...state, isFetching: payload.isFetching };
  case GET_CURRENCIES:
    return { ...state, currencies: payload.currencies, isFetching: payload.isFetching };
  case ADD_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, payload].sort((a, b) => a.id - b.id),
    };
  case EDIT_EXPENSE:
    return { ...state,
      editTarget: state.expenses.find((expense) => expense.id === payload),
    };
  case CONFIRM_EDIT:
    return { ...state, editTarget: { ...state.editTarget, ...payload } };
  case DELETE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== payload),
      editTarget: {},
    };
  default:
    return state;
  }
};

export default wallet;
