import { ADD_EXPENSE, SAVE_CURRENCIES, SUM_TO_EXPENSES } from '../store/consts';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return { ...state, currencies: action.payload };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, ...action.payload] };
  case SUM_TO_EXPENSES:
    return { ...state, total: state.total + action.payload };
  default:
    return state;
  }
};

export default walletReducer;
