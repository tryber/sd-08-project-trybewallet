// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_DESPESA':
    return { ...state, expenses: [...state.expenses, action.despesa] };
  default:
    return state;
  }
}
