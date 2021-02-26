// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
  totalExpenses: 0,
};

export default function walletReducer(state = initialState, action) {
  switch (action.type) {
  case 'something':
    return {
      ...state,
    };
  default:
    return state;
  }
}
