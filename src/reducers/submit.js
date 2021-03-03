const INITIAL_STATE = {
  expense: [],
  id: 0,
};

const addExpense = (state = INITIAL_STATE, action) => {
  const newExpense = {
    id: state.id,
    ...action,
  };
  return {
    ...state,
    expense: [...state.expense, newExpense],
    id: state.id + 1,
  };
};

export default addExpense;
