import {
  REQUEST_CURRENCIES_VALUES,
  REQUEST_CURRENCIES_VALUES_SUCCESS,
  REQUEST_CURRENCIES_VALUES_ERROR,
} from '../actions';

const INITIAL_WALLET_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_WALLET_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES_VALUES:
    return {
      ...state, isFetching: false,
    };
  case REQUEST_CURRENCIES_VALUES_SUCCESS:
    console.log(action);
    return {
      ...state, currencies: Object.values(action.payload.currencies), isFetching: false,
    };
  case REQUEST_CURRENCIES_VALUES_ERROR:
    return { ...state, isFetching: false, error: action.error };
  default:
    return state;
  }
}
