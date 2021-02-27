// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CURRENCIES_ADD':
    return { ...state, wallet: { ...state.wallet, currencies: action.payload } };
  case 'EXPENSE_ADD':
    return { ...state, expenses: [...state.expenses, action.payload] };
  default:
    return state;
  }
};
