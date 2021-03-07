import { Types } from '../actions/wallet';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  idCount: 0,
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

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Types.SAVE_CURRENCIES: return saveCurrencies(state, action);
  case Types.ADD_EXPENSE: return addExpense(state, action);
  default: return state;
  }
};

export default wallet;
