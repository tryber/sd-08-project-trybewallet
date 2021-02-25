const INITIAL_STATE = {
  expenses: {
    valor: 0,
  },
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_DESPESA':
    return { ...state, expenses: action.expenses };
  default:
    return state;
  }
}
