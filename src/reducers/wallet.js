import { Types } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  idCount: 0,
};

const saveCurrencies = (state = INITIAL_STATE, action) => ({
  ...state, currencies: action.payload,
});

const addExpense = (state = INITIAL_STATE, action) => {
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

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Types.SAVE_CURRENCIES: return saveCurrencies(state, action);
  case Types.ADD_EXPENSE: return addExpense(state, action);
  default: return state;
  }
};

export default wallet;
