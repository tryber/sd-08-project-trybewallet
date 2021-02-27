import { FAILED_FETCH_CURRENCIES, REFRESH_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
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
  default:
    return state;
  }
}

export default wallet;
