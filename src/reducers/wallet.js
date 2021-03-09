import { REQUEST_CURRENCY, ADD_EXPENSES } from '../actions/index';

const initialState = {
  currencies: [],
  expenses: [],
  sum: 0,
};

function currency(state = initialState, action) {
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
  default:
    return state;
  }
}

export default currency;
