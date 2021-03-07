import { REQUEST_CURRENCY, SAVE_DATA } from '../actions/index';

const initialState = {
  currency: {},
  expenses: [],
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

  default:
    return state;
  }
}
