import { REQUEST_CURRENCY } from '../actions/index';

const initialState = {
  currency: {},
};

export default function currency(state = initialState, action) {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return {
      ...state,
      currency: action.currency,
    };

  default:
    return state;
  }
}
