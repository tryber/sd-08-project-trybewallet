import {
  REQUEST_CURRENCIES_VALUES,
  REQUEST_CURRENCIES_VALUES_SUCCESS,
  REQUEST_CURRENCIES_VALUES_ERROR,
  SAVE_EXPENSE_USER,
  DELETE_EXPENSE_USER,
} from '../actions';

const INITIAL_WALLET_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_WALLET_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES_VALUES:
    return {
      ...state, isFetching: false,
    };
  case REQUEST_CURRENCIES_VALUES_SUCCESS:
    return {
      ...state, currencies: Object.values(action.payload.currencies), isFetching: false,
    };
  case REQUEST_CURRENCIES_VALUES_ERROR:
    return { ...state, isFetching: false, error: action.error };
  case SAVE_EXPENSE_USER:
    return {
      ...state, expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE_USER:
    return {
      ...state,
      expenses: [
        ...state.expenses.filter((expense) => expense.id !== action.payload),
      ],
      isFetching: false,
    };
  default:
    return state;
  }
}
