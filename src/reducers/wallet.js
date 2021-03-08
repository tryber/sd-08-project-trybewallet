import { REQUEST_CURRENCY } from '../actions/index';

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
  default:
    return state;
  }
}

export default currency;
