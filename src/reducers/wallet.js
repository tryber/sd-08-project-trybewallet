// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  REQUEST_TO_API,
  REQUEST_SUCESS,
  REQUEST_FAIL,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  INIT_EDIT_EXPENSE,
  FINISH_EDIT_EXPENSE,
} from '../actions/wallet';

const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE_WALLET, action) {
  switch (action.type) {
  case REQUEST_TO_API:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_SUCESS:
    return {
      ...state,
      isFetching: false,
      currencies: [...Object.keys(action.currencies)
        .filter((noUSTD) => noUSTD !== 'USDT')],
    };
  case REQUEST_FAIL:
    return { ...state, isFetching: false, error: action.error };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter(
        (expense) => console.log(`expense: ${expense}, action: ${action}`),
      ), action.expenses],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses.filter((expense) => expense.id !== action.expense.id),
      ],
      isEditing: false,
    };
  case INIT_EDIT_EXPENSE:
    return {
      ...state,
      isEditing: true,
      expenseId: action.expense.id,
    };
  case FINISH_EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((item) => {
        if (item.id === action.expense.id) return { ...item, ...action.expense };
        return item;
      }),
      isEditing: false,
    };
  default:
    return state;
  }
}
