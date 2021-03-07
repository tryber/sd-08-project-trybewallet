import { Types } from '../actions/wallet.action';

const initialState = {
  currencies: [],
  expenses: [],
  idCount: 0,
};

const saveCurrencies = (state = initialState, action) => ({
  ...state, currencies: action.payload,
});

const addExpense = (state = initialState, action) => {
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

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case Types.SAVE_CURRENCIES:
    return saveCurrencies(state, action);
  case Types.ADD_EXPENSE:
    return addExpense(state, action);
  case Types.ADD_EXPENSE_WITH_CURRENCIES:
    return {
      ...state,
      expenses:
      [...state.expenses, { id: state.idCount, ...action.payload }],
      idCount: state.idCount + 1,
    };
  default:
    return state;
  }
};

export default wallet;
