const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, payload] };
  case 'SET_CURRENCIES':
    return { ...state, currencies: payload };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => parseInt(expense.id, 10) !== parseInt(payload, 10),
      ) };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.map((currentExpense) => {
        if (parseInt(currentExpense.id, 10) === parseInt(payload.id, 10)) {
          return payload;
        }
        return currentExpense;
      }),
    };
  default:
    return state;
  }
}

export default wallet;
