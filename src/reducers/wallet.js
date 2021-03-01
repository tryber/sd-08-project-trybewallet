// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  default:
    return state;
  }
}

export default walletReducer;
