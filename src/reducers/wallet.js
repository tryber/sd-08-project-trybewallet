import {
  REQUEST_START,
  REQUEST_SUCCESS,
  REQUEST_FAIL,
} from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currency: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_START:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_SUCCESS:
    return {
      ...state,
      isFetching: false,
      currencies: [...Object.keys(action.currencies)],
    };
  case REQUEST_FAIL:
    return { ...state, isFetching: false, error: action.error };
  default:
    return state;
  }
}
