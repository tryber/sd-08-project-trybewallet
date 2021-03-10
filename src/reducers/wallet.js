import { REQUEST_CURRENCY, ADD_EXPENSES, DELETE_EXPENSE } from '../actions/index';

const initialState = {
  currencies: [],
  expenses: [],
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return {
      ...state,
      currencies: [...action.payload],
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((exp) => exp !== action.payload),
    };
  default:
    return state;
  }
}

export default wallet;
