// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  IS_FETCHING,
  REQUEST_CURRENCY,
  ADD_EXPENSE,
  DELETE_EXPENSE,
} from '../common/ActionTypes';

const initialState = {
  currencies: [],
  isFetch: false,
  expenses: [],
  idExp: null,
};

export default function wallet(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
  case REQUEST_CURRENCY:
    return {
      ...state,
      currencies: [...Object.keys(payload)],
      isFetch: false,
    };
  case IS_FETCHING:
    return {
      ...state,
      isFetch: true,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== payload)],
      // idExp: payload,
    };
  default:
    return state;
  }
}
