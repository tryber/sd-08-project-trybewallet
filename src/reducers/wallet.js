import { ADD_CURRENCIES, ADD_EXPENSES, DELETE_EXPENSES } from '../actions/index';

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

const deleteExpenses = (state = INITIAL_STATE, action) => ({
  ...state,
  expenses: state.expenses.filter((value) => value.id !== action.payload),
});

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_CURRENCIES:
    return { ...state, currencies: action.currencies };
  case ADD_EXPENSES:
    return expense(state, action);
  case DELETE_EXPENSES:
    return deleteExpenses(state, action);
  default:
    return state;
  }
}

export default walletReducer;
