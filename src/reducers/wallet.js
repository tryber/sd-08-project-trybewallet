import { REQUEST_CURRENCY, SAVE_DATA, SAVE_TOTAL } from '../actions/index';

const initialState = {
  currency: {},
  expenses: [],
  sum: 0,
};

export default function currency(state = initialState, action) {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return {
      ...state,
      currency: action.currency,
    };
  case SAVE_DATA:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case SAVE_TOTAL:
    return {
      ...state,
      sum: state.sum + action.sum,
    };

  default:
    return state;
  }
}
