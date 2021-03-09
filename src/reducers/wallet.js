// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_API,
  REQUEST_API_SUCCESS } from '../actions/requestAPI';
import { REQ_FOR_ADD_EXPENSE, REQ_FOR_ADD_EXPENSE_SUCCESS,
  REQ_FOR_ADD_EXPENSE_ERROR, DELETE_EXPENSE, UPDATE_EXPENSE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  currenciesCode: [],
  expenses: [],
};
const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isFetching: action.payload.isFetching,
    };
  case REQUEST_API_SUCCESS:
    return {
      ...state,
      currencies: action.payload.coins,
      isFetching: action.payload.isFetching,
    };
  case REQ_FOR_ADD_EXPENSE:
    return {
      ...state,
      isFetching: true,
    };
  case REQ_FOR_ADD_EXPENSE_SUCCESS:
    return {
      ...state,
      expenses: [...state.expenses, action.payload.coins],
    };
  case REQ_FOR_ADD_EXPENSE_ERROR:
    return {
      ...state,
      error: action.payload,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  case UPDATE_EXPENSE:
    return {
      ...state,
      expenses: [...action.payload.expenses],
    };
  default:
    return state;
  }
};

export default wallet;
