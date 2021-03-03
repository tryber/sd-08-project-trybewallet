import { ADD_EXPENSE, REMOVE_EXPENSE, SAVE_CURRENCIES, SUBTRACT_FROM_TOTAL, SUM_TO_EXPENSES } from '../store/consts';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0.00,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return { ...state, currencies: action.payload };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, ...action.payload] };
  case SUM_TO_EXPENSES:
    return { ...state, total: parseFloat((state.total + action.payload).toFixed(2)) };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses
        .filter((expense) => expense.id !== action.payload),
    };
  case SUBTRACT_FROM_TOTAL:
    return { ...state, total: parseFloat((state.total - action.payload).toFixed(2)) };
  default:
    return state;
  }
};

export default walletReducer;
