import { GET_CURRENCIES, REQUEST_API_CURRENCIES,
  ADD_EXPENSE, RM_EXPENSE, EDIT_EXPENSE, EDITING } from '../actions';

export const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editingExpenseId: -1,
  lastId: -1,
};

export const currenciesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API_CURRENCIES:
    return state;
  case GET_CURRENCIES:
    return { ...state, currencies: action.data };
  case ADD_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, action.payload],
      lastId: action.payload.id };
  case RM_EXPENSE:
    return { ...state,
      expenses: [...state.expenses]
        .filter(({ id }) => id !== action.payload.id) };
  case EDITING:
    return { ...state, editingExpenseId: action.payload.id };
  case EDIT_EXPENSE:
    return { ...state,
      editingExpenseId: -1,
      expenses: [...state.expenses].map((expense) => {
        if (expense.id === state.editingExpenseId) {
          return { ...expense, ...action.payload };
        }
        return expense;
      }) };
  default:
    return state;
  }
};
