import {
  ADD_EXPENSE, FAILED_FETCH_CURRENCIES, NEW_CURRENCY_UID, REFRESH_CURRENCIES,
  DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  expenseUID: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REFRESH_CURRENCIES:
    return {
      ...state,
      currencies: Object.values(action.payload.currencies),
    };
  case FAILED_FETCH_CURRENCIES:
    return {
      ...state,
      error: action.payload.error,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload.expenseObj],
    };
  case NEW_CURRENCY_UID:
    return {
      ...state,
      expenseUID: state.expenseUID + 1,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload.id),
    };
  default:
    return state;
  }
}

export default wallet;
