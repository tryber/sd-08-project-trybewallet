// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_TRY,
  REQUEST_SUCCESS, REQUEST_FAIL,
  SAVE_EXPENSE, REMOVE_EXPENSE,
  EDITING_EXPENSE,
  EDITED_EXPENSE,
} from '../const';

const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
};
export default function wallet(state = INITIAL_STATE_WALLET, action) {
  switch (action.type) {
  case REQUEST_TRY:
    return {
      ...state,
      loading: true,
    };
  case REQUEST_SUCCESS:
    return {
      ...state,
      loading: false,
      currencies: Object.keys(action.currencies),
    };
  case REQUEST_FAIL:
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  case SAVE_EXPENSE:
    return {
      ...state, expenses: [...state.expenses, action.expenses],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses.filter((expense) => expense.id !== action.expense.id),
      ],
      editingExpense: false,
    };
  case EDITING_EXPENSE:
    return {
      ...state,
      editingExpense: true,
      expenseId: action.expense.id,
    };
  case EDITED_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((item) => {
        if (item.id === action.expense.id) return { ...item, ...action.expense };
        return item;
      }),
      editingExpense: false,
    };
  default:
    return state;
  }
}
