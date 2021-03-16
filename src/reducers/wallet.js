import { REQUEST_CURRENCY, SAVE_DATA, EXCLUDES_DATA } from '../actions/index';

const initialState = {
  currency: [],
  expenses: [],
};

export default function wallet(state = initialState, action) {
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
  case EXCLUDES_DATA:
    // console.log(action.excludeExpense);
    return {
      ...state,
      expenses: action.excludeExpense,
    };

  default:
    return state;
  }
}
