// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCY,
  REQUEST_CURRENCY,
  FAILED_REQUEST,
  ADD_EXPENSES,
  DELETE_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
};

export default function expensesReducerAction(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCY:
    return {
      ...state,
      currencies: state.currencies.concat(action.payload),
      isFetching: false,
    };
  case REQUEST_CURRENCY:
    return { ...state, isFetching: true };
  case FAILED_REQUEST:
    return {
      ...state,
      error: action.payload,
      isFetching: false,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.payload, id: state.expenses.length }],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...action.payload],
    };
  default:
    return state;
  }
}
