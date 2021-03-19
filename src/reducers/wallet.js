const INITIAL_STATE = {
  total: 0,
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.expense] };
  case 'TOTAL_VALUE':
    return { ...state, total: action.value };
  default:
    return state;
  }
}
