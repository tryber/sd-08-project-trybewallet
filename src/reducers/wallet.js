import { Types } from '../actions/wallet';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  idCount: 0,
  editor: false,
  idToEdit: null,
};

const saveCurrencies = (state = INITIAL_STATE, action) => ({
  ...state, currencies: action.payload,
});

const addExpense = (state = INITIAL_STATE, action) => {
  const { idCount, expenses } = state;
  const newExpense = {
    id: idCount,
    ...action.payload,
  };
  return {
    ...state,
    expenses: [...expenses, newExpense],
    idCount: idCount + 1,
  };
};

const editExpense = (state = INITIAL_STATE, action) => ({
  ...state,
  editor: true,
  idToEdit: action.payload,
});

const saveExpense = (state = INITIAL_STATE, action) => ({
  ...state,
  editor: false,
  idToEdit: null,
  expenses: state.expenses.map((expense) => {
    if (expense.id === state.idToEdit) {
      return { ...expense, ...action.payload };
    }
    return expense;
  }),
});

const removeExpense = (state = INITIAL_STATE, action) => ({
  ...state,
  expenses: state.expenses.filter((expense) => expense.id !== action.payload),
});

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Types.SAVE_CURRENCIES: return saveCurrencies(state, action);
  case Types.ADD_EXPENSE: return addExpense(state, action);
  case Types.REMOVE_EXPENSE: return removeExpense(state, action);
  case Types.EDIT_EXPENSE: return editExpense(state, action);
  case Types.SAVE_EXPENSE: return saveExpense(state, action);
  default: return state;
  }
};

export default wallet;
