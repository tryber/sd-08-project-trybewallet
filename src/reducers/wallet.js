import { WALLET, GET_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: true,
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case WALLET:
    return { ...state, isFetching: payload.isFetching };
  case GET_CURRENCIES:
    return { ...state,
      currencies: [...state.currencies, payload.currencies],
      isFetching: payload.isFetching };
  default:
    return state;
  }
};

export default wallet;
