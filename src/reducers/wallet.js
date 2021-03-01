// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
  total: 0,
};

export default function walletReducer(state = initialState, action) {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return {
      currencies: [...state.currencies],
      expenses: [...state.expenses, action.payload.expense],
      total: state.total + action.payload.convertedValue,
    };
  case 'DELETE_EXPENSE': {
    const newExpenses = state.expenses
      .filter((expense) => (expense.id !== action.payload.id));
    const newTotal = state.total - state.expenses
      .find((s) => s.id === action.payload.id)
      .value;
    return {
      currencies: [...state.currencies],
      expenses: [...newExpenses],
      total: newTotal,
    };
  }
  default:
    return state;
  }
}
