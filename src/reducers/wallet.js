import * as myActions from '../actions';

const { REQUEST_START,
  FETCH_OK,
  FETCH_FAIL,
  SAVE_ENTRY,
  DELETE_ENTRY,
  EDIT_ENTRY_START,
  EDIT_ENTRY_END } = myActions;

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_START:
    return {
      ...state, isFetching: true,
    };
  case FETCH_OK:
    return {
      ...state,
      isFetching: false,
      currencies: [...Object.keys(action.currencies)],
    };
  case FETCH_FAIL:
    return { ...state, isFetching: false, error: action.error };
  case SAVE_ENTRY:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case DELETE_ENTRY:
    return {
      ...state,
      expenses: [
        ...state.expenses.filter(
          (expense) => expense.id !== action.expense.id,
        ),
      ],
      editMode: false,
    };
  case EDIT_ENTRY_START:
    return {
      ...state,
      editMode: true,
      expenseId: action.expense.id,
    };
  case EDIT_ENTRY_END:
    return {
      ...state,
      expenses: state.expenses.map((item) => {
        if (item.id === action.expense.id) {
          return { ...item, ...action.expense };
        }
        return item;
      }),
      editMode: false,
    };
  default:
    return state;
  }
}
