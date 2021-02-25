// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
};

export default function walletReducer(state = initialState, action) {
  switch (action.type) {
  case 'something':
    return 'something';
  default:
    return state;
  }
}
