// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { Types } from '../actions/wallet';

const INITIAL_STATE = {
  expenses: [],
  idCounter: 0,
  editor: false,
  idToEdit: null,
  currencies: [],
};

const addExpense = (state = INITIAL_STATE, action) => {
  const newExpense = {
    ...action.payload,
    id: state.idCounter,
  };
  return {
    ...state,
    expenses: [...state.expenses, newExpense],
    idCounter: state.idCounter + 1,
  };
};

const removeExpense = (state = INITIAL_STATE, action) => ({
  ...state,
  expenses: state.expenses.filter((expense) => expense.id !== action.id),
});

const editExpense = (state = INITIAL_STATE, action) => ({
  ...state,
  editor: true,
  idToEdit: action.id,
});

const saveExpense = (state = INITIAL_STATE, action) => ({
  ...state,
  expenses: state.expenses.map((expense) => {
    if (expense.id === action.payload.id) {
      return { ...expense, ...action.payload };
    }
    return expense;
  }),
  editor: false,
  idToEdit: null,
});

const saveCurrencies = (state = INITIAL_STATE, action) => ({
  ...state,
  currencies: action.payload,
});

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case Types.ADD_EXPENSE: return addExpense(state, action);
  case Types.REMOVE_EXPENSE: return removeExpense(state, action);
  case Types.EDIT_EXPENSE: return editExpense(state, action);
  case Types.SAVE_EXPENSE: return saveExpense(state, action);
  case Types.SAVE_CURRENCIES: return saveCurrencies(state, action);
  default: return state;
  }
}
