import {
  REQUEST_CURRENCY,
  ADD_EXPENSES,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EXPENSE,
} from '../actions/index';

const initialState = {
  currencies: [],
  expenses: [],
  edit: false,
  editId: null,
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return {
      ...state,
      currencies: [...action.payload],
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((exp) => exp !== action.payload),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      edit: true,
      editId: action.payload,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses
        .filter((exp) => exp.id !== state.editId), action.payload],
      edit: false,
    };
  default:
    return state;
  }
}

export default wallet;
