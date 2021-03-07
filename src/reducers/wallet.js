import {
  REQUEST_CURRENCY_TYPE,
  REQUEST_CURRENCY_TYPE_SUCCESS,
  REQUEST_CURRENCY_TYPE_ERROR,
  HANDLE_ADD_EXPENSE,
} from '../actions';

const INITIAL_CURRENCY_TYPE_STATE = {
  currency: {},
  expenses: [],
};

export const walletReducer = (state = INITIAL_CURRENCY_TYPE_STATE,
  { type, payload }) => {
  switch (type) {
  case REQUEST_CURRENCY_TYPE:
    return { ...state };
  case REQUEST_CURRENCY_TYPE_SUCCESS:
    return { ...state, currency: payload.types };
  case REQUEST_CURRENCY_TYPE_ERROR:
    return { ...state, error: payload.error };
  case HANDLE_ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, payload] };
  default:
    return state;
  }
};

export default walletReducer;
