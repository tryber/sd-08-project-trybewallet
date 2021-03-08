import { REQUEST_START, REQUEST_SUCCESS, REQUEST_FAIL, SALVAR_GASTO } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
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
      currencies: [action.currencies],
    };
  case REQUEST_FAIL:
    return {
      ...state,
      isFetching: false,
      error: action.error,
    };
  case SALVAR_GASTO:
    return {
      ...state, expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
};

export default walletReducer;
