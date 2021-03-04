import {
  SAVED_INPUT,
  REQUEST_API,
  GET_CURRENCY_API,
  FAILED_REQUEST_API } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  // idCount: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return { ...state };
  case GET_CURRENCY_API:
    return { ...state, currencies: action.payload.currencies };
  case FAILED_REQUEST_API:
    return { ...state, error: action.payload.error };
  case SAVED_INPUT:
    return { ...state,
      expenses: [...state.expenses,
        { ...action.expenses,
          // id: state.id,
          exchangeRates: state.currencies }],
    };
  default:
    return state;
  }
};

export default wallet;
