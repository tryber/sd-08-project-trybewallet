import { Types } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  expenseId: 0,
  isEditing: false,
  editId: undefined,
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case Types.SAVE_CURRENCIES:
    return { ...state, currencies: action.payload };
  case Types.ADD_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, { id: state.expenseId, ...action.payload }],
      expenseId: state.expenseId + 1,
    };
  case Types.REMOVE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload) };
  case Types.EDIT_EXPENSE: {
    const newExpenses = state.expenses.map((expense) => {
      if (expense.id === state.editId) {
        return { ...expense, ...action.payload };
      }
      return expense;
    });
    return { ...state,
      expenses: newExpenses,
      isEditing: false,
    };
  }
  case Types.SET_EDIT: {
    return { ...state,
      isEditing: action.payload.status,
      editId: action.payload.id };
  }
  default:
    return state;
  }
}

export default wallet;
