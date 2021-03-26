import {
  REQUEST_CURRENCIES_VALUES,
  REQUEST_CURRENCIES_VALUES_SUCCESS,
  REQUEST_CURRENCIES_VALUES_ERROR,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  UPDATE_EXPENSE,
} from '../actions';

const INITIAL_WALLET_STATE = {
  currencies: [],
  expenses: [],
  idToEdit: 0,
  editor: false,
  idCounter: 0,
};

export default function wallet(state = INITIAL_WALLET_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES_VALUES:
    return {
      ...state, isFetching: false,
    };
  case REQUEST_CURRENCIES_VALUES_SUCCESS:
    return {
      ...state, currencies: Object.values(action.payload.currencies), isFetching: false,
    };
  case REQUEST_CURRENCIES_VALUES_ERROR:
    return { ...state, isFetching: false, error: action.error };
  case ADD_EXPENSE: {
    const newExpense = { id: state.idCounter, ...action.payload };
    return {
      ...state,
      expenses: [...state.expenses, newExpense],
      idCounter: state.idCounter + 1,
    };
  }
  case UPDATE_EXPENSE: {
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === state.idToEdit) {
          return { ...expense, ...action.payload };
        }
        return expense;
      }),
      editor: false,
    };
  }
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses.filter((expense) => expense.id !== action.payload)],
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  default:
    return state;
  }
}
