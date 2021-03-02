import { RECEIVE_CURRENCY } from '../actions/fetchapi';
import { EXPENSES } from '../actions/expenses';

const initialState = {
  currencies: [],
  expenses: [],
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case RECEIVE_CURRENCY:
    return ({
      ...state,
      currencies: Object.keys(action.payload),
    });
  case EXPENSES:
    return ({
      ...state,
      expenses: [...state.expenses, action.payload],
    });
  default:
    return state;
  }
};

export default wallet;
