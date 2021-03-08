import { SAVE_CURRENCIES, SAVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, { type, value }) {
  switch (type) {
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: value,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, value],
    };
  default:
    return state;
  }
}

export default wallet;
