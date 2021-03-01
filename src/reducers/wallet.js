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
  case 'DELETE_EXPENSE': {
    const newExpenses = state.expenses
      .filter((expense) => (expense.id !== action.payload.id));
    return {
      currencies: [...state.currencies],
      expenses: [...newExpenses],
    };
  }
  default:
    return state;
  }
}
