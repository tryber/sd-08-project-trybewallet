import { createReducer } from '../libs/reduxsauce';
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
    ...action.expense,
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

const saveExpense = (state = INITIAL_STATE, action) => ({
  ...state,
  expenses: state.expenses.map((expense) => {
    if (expense.id === action.expense.id) {
      return { ...expense, ...action.expense };
    }
    return expense;
  }),
  editor: false,
  idToEdit: null,
});

const saveCurrencies = (state = INITIAL_STATE, action) => ({
  ...state,
  currencies: action.currencies,
});

const editExpense = (state = INITIAL_STATE, action) => ({
  ...state,
  editor: true,
  idToEdit: action.id,
});

const HANDLERS = {
  [Types.ADD_EXPENSE]: addExpense,
  [Types.REMOVE_EXPENSE]: removeExpense,
  [Types.EDIT_EXPENSE]: editExpense,
  [Types.SAVE_EXPENSE]: saveExpense,
  [Types.SAVE_CURRENCIES]: saveCurrencies,
};

export default createReducer(INITIAL_STATE, HANDLERS);
