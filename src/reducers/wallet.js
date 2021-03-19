import * as myActions from '../actions';

const { REQUEST_START,
  FETCH_OK,
  FETCH_FAIL,
  SAVE_ENTRY,
  DELETE_ENTRY, } = myActions;

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
    };
  default:
    return state;
  }
}
