const CURRENCY = 'CURRENCY';
const EXPENSES = 'EXPENSES';

const INIT_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INIT_STATE, action) {
  switch (action.type) {
  case CURRENCY:
    return { ...state, currencies: action.currencies };
  case EXPENSES:
    return { ...state, expenses: action.expenses };
  default:
    return state;
  }
}

export default walletReducer;
