import {
  REQUEST_CURRENCY_TYPE,
  REQUEST_CURRENCY_TYPE_SUCCESS,
  REQUEST_CURRENCY_TYPE_ERROR,
  HANDLE_ADD_EXPENSE,
  HANDLE_DELETE_EXPENSE,
  HANDLE_EDIT_EXPENSE,
  HANDLE_SUBMIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currency: {},
  expenses: [],
  id: 0,
  isEditing: false,
};

export const walletReducer = (state = INITIAL_STATE,
  { type, payload }) => {
  switch (type) {
  case REQUEST_CURRENCY_TYPE:
    return { ...state };
  case REQUEST_CURRENCY_TYPE_SUCCESS:
    return { ...state, currency: payload.types };
  case REQUEST_CURRENCY_TYPE_ERROR:
    return { ...state, error: payload.error };
  case HANDLE_ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, payload] };
  case HANDLE_DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== payload),
    };
  case HANDLE_EDIT_EXPENSE:
    return { ...state, isEditing: true, id: payload };
  case HANDLE_SUBMIT_EXPENSE:
    return {
      ...state,
      isEditing: false,
      expenses: state.expenses.map((expense) => (expense.id === state.id
        ? { ...expense, ...payload }
        : expense)),
    };
  default:
    return state;
  }
};

export default walletReducer;
