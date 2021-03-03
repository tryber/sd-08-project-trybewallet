import { SAVE_CURRENCIES, ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  idCount: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  const { idCount, expenses } = state;
  const newExpense = {
    id: idCount,
    ...action.payload,
  };
  switch (action.type) {
  case SAVE_CURRENCIES:
    return {
      ...state, currencies: action.payload,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...expenses, newExpense],
      idCount: idCount + 1,
    };
  default: return state;
  }
};

export default wallet;
