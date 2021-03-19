// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_CURRENCY,
  REQUEST_CURRENCY_SUCCESS,
  REQUEST_CURRENCY_ERROR,
} from '../actions';

const INITIAL_STATE = {
  fields: {
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
  },
  currencies: [],
  // expenses: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_CURRENCY_SUCCESS:
    return {
      ...state,
      currencies: action.payload.currencies,
      isFetching: false,
    };
  case REQUEST_CURRENCY_ERROR:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
}
