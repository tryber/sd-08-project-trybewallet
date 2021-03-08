// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  EDIT_EXPENSE_ADD,
  REQUEST_CURRENCIES,
  REQUEST_CURRENCIES_ERROR, REQUEST_CURRENCIES_SUCCESS } from '../actions/actionsType';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, isFetching: action.isFetching };
  case REQUEST_CURRENCIES_SUCCESS:
    return { ...state,
      currencies: [...Object.keys(action.currencies)],
      isFetching: action.isFetching };
  case REQUEST_CURRENCIES_ERROR:
    return { ...state, error: state.error, isFetching: action.isFetching };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.expenses] };
  case DELETE_EXPENSE:
    return { ...state, expenses: [...action.expenses] };
  case EDIT_EXPENSE:
    return { ...state, isEditing: action.isEditing, expense: action.expense };
  case EDIT_EXPENSE_ADD:
    return { ...state,
      expenses: [
        action.expense,
        ...state.expenses.filter((item) => item.id !== action.expense.id),
      ],
      isEditing: action.isEditing,
    };
  default:
    return state;
  }
}
