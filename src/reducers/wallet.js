// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES, FAILED_REQUEST, ADD_EXPENSE } from '../actions/index';

// *ADD_EXPENSE FAILED_REQUEST
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: false,
};

const walletReducer = (state = INITIAL_STATE,
  { type, payload }) => {
  switch (type) {
  case REQUEST_CURRENCIES:
    return { ...state, isLoading: payload.isLoading };
  case RECEIVE_CURRENCIES:
    return { ...state,
      currencies: [...Object.keys(payload.currencies)],
      isLoading: payload.isLoading };
  case FAILED_REQUEST:
    return { ...state, error: payload.error, isLoading: payload.isLoading };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, payload.expenses] };
  default:
    return state;
  }
};

export default walletReducer;
