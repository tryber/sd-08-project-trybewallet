import {
  GET_CURRENCIES,
  SET_CURRENCIES,
  FAILED_REQUEST,
  CREATE_EXPENSE,
  DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: true,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, isLoading: true };

  case SET_CURRENCIES:
    return { ...state, currencies: action.payload, isLoading: false };

  case FAILED_REQUEST:
    return { ...state, error: action.payload, isLoading: false };

  case CREATE_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };

  default:
    return state;
  }
};

export default walletReducer;
