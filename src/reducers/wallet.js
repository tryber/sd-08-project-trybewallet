const INITIAL_STATE = {
  expenses: [],
  auxiliar: {},
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_DESPESA':
    return { ...state, expenses: [...state.expenses, action.expenses] };
  case 'ADD_AUXILIAR':
    return { ...state, auxiliar: action.auxiliar };
  default:
    return state;
  }
}
