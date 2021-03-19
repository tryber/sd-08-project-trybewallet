import {
  SAVE_EXPENSES,
  SAVE_CURRENCIES,
  DELETE_EXPENSES,
  EDIT_EXPENSES,
  SAVE_EDITED_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  edit: false,
  editId: '',
};

export default function wallet(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SAVE_CURRENCIES:
    return { ...state,
      currencies: payload.currencies };
  case SAVE_EXPENSES:
    return { ...state,
      expenses: [...state.expenses, payload.expenses],
    };
  case DELETE_EXPENSES:
    return { ...state,
      expenses: [...state.expenses.filter((item) => item.id !== payload.expenseId)],
    };
  case EDIT_EXPENSES:
    return { ...state,
      edit: true,
      editId: payload.expenseId,
    };
  case SAVE_EDITED_EXPENSES:
    return { ...state,
      expenses: [...state.expenses.map((expense) => {
        if (expense.id === state.editId) return { ...payload.expenseEdited };
        return expense;
      })],
      edit: false,
      editId: '',
    };
  default:
    return state;
  }
}
