import { REQUEST_API, REQUEST_API_SUCESS } from '../actionCreator/actionApi.js';
import { USER_WALLET } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isLoading: true,
    };
  case REQUEST_API_SUCESS:
    return {
      ...state,
      isLoading: false,
      currencies: action.payload,
    };
  case USER_WALLET:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.payload }],

    };
  default:
    return state;
  }
}

export default wallet;
