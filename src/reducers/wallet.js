const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  const { expense, updatedExpenses, type } = action;
  switch (type) {
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, expense],
    };
  case 'UPDATE_EXPENSES':
    return {
      ...state,
      expenses: updatedExpenses,
    };
  default:
    return state;
  }
}

export default wallet;
