// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
};

export default function walletReducer(state = initialState, action) {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return {
      currencies: [...state.currencies],
      expenses: [...state.expenses, action.payload.expense],
    };
  default:
    return state;
  }
}
