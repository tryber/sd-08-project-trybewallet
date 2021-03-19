import { FETCH_SAVE_CURRENCIES } from '../actions/wallet';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  idCounter: 0,
};

const saveCurrencies = (state = INITIAL_STATE, action) => ({
  ...state, currencies: action.payload,
});

const addExpense = (state = INITIAL_STATE, action) => {
  const { idCounter, expenses } = state;
  const newExpense = {
    id: idCounter,
    ...action.payload,
  };
  return {
    ...state,
    expenses: [...expenses, newExpense],
    idCounter: idCounter + 1,
  };
};

const editExpense = (state = INITIAL_STATE, action) => ({
  ...state,
  editor: true,
  idToEdit: action.id,
});

const removeExpense = (state = INITIAL_STATE, action) => ({
  ...state,
  expenses: state.expenses.filter((expense) => expense.id !== action.payload),
});

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_SAVE_CURRENCIES.SAVE_CURRENCIES:
    return (
      saveCurrencies(state, action)
    );
  case FETCH_SAVE_CURRENCIES.ADD_EXPENSE:
    return (
      addExpense(state, action)
    );
  case FETCH_SAVE_CURRENCIES.REMOVE_EXPENSE:
    return (
      removeExpense(state, action)
    );
  case FETCH_SAVE_CURRENCIES.EDIT_EXPENSE:
    return (
      editExpense(state, action)
    );
  default:
    return state;
  }
};

export default wallet;
