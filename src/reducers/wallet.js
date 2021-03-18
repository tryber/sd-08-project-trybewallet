import {
  REQUEST_START,
  REQUEST_SUCCESS,
  REQUEST_FAIL,
  ADD_EXPENSE,
  DELETE_EXPENSES,
  EDIT_EXPENSES,
  CONFIRM_EDITING,
} from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currency: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_START:
    return { ...state, isFetching: true,
    };
  case REQUEST_SUCCESS:
    return {
      ...state,
      isFetching: false,
      currencies: [...Object.keys(action.currencies)],
    };
  case REQUEST_FAIL:
    return { ...state, isFetching: false, error: action.error };

  case ADD_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, action.payload],
    };

  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses.filter((i) => i.id !== action.payload),
      ],
      editTarget: false,
    };
    // Feito com ajuda do site: https://www.codingame.com/playgrounds/9169/simple-redux-create-delete-contact-application

  case EDIT_EXPENSES:
    return {
      ...state,
      editTarget: true,
      expenseId: action.payload.id,
    };
  case CONFIRM_EDITING:
    return {
      ...state,
      expenses: state.expenses.map((item) => {
        if (item.id === action.expense.id) return { ...item, ...action.expense };
        return item;
      }),
      editTarget: false,
    };
  default:
    return state;
  }
}
