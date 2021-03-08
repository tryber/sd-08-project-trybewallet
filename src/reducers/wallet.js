import {
  REQUEST_START,
  REQUEST_SUCESS,
  REQUEST_FAIL,
  SAVE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_START:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_SUCESS:
    return {
      ...state,
      isFetching: false,
      currencies: [...Object.keys(action.currencies)],
    };
  case REQUEST_FAIL:
    return {
      ...state,
      isFetching: false,
      error: action.error,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
}
