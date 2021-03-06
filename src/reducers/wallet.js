import { ADD_CURRENCIES, ADD_EXPENSES } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  idCount: 0,
};

const expense = (state = INITIAL_STATE, action) => {
  const newExpense = {
    id: state.idCount,
    ...action.payload,
  };
  return {
    ...state,
    expenses: [...state.expenses, newExpense],
    idCount: state.idCount + 1,
  };
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_CURRENCIES:
    return { ...state, currencies: action.currencies };
  case ADD_EXPENSES:
    return expense(state, action);
  default:
    return state;
  }
}

export default walletReducer;
