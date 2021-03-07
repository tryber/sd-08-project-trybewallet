const INITIAL_STATE = {
  expenses: [],
  id: -2,
};

const addExpense = (state = INITIAL_STATE, action) => {
  const newExpense = {
    id: state.id,
    ...action.payload,
  };
  return {
    ...state,
    expenses: [...state.expenses, newExpense],
    id: state.id + 1,
  };
};

export default addExpense;
