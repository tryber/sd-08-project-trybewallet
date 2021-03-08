import {
  REQUEST_CURRENCIES_API, REQUEST_CURRENCIES_API_ERROR,
  REQUEST_CURRENCIES_API_SUCCESS, SAVE_EXPENSE,
} from '../actions';

const WALLET_INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = WALLET_INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES_API:
    return {
      ...state,
      isFetching: action.payload.isFetching,
    };
  case REQUEST_CURRENCIES_API_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.payload.currencies),
      isFetching: action.payload.isFetching,
    };
  case REQUEST_CURRENCIES_API_ERROR:
    return {
      ...state,
      error: action.payload.error,
      isFetching: action.payload.isFetching,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
};

export default walletReducer;
