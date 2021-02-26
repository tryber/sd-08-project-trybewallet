// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = { currencies: [],
  expenses: [] };

function wallet(state = initialState, action) {
  switch (action.type) {
  case 'ADD_REGISTER':
    return [...state, action.data];
  case 'DELETE_REGISTER':
    return state.filter((register) => register !== action.value);
  default:
    return state;
  }
}

export default wallet;
