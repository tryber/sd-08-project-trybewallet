// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_VALUE = {
  currencies: [],
  expenses: [],
  total: 0,
};
const walletReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
  case 'AlgumaCoisa':
    return state;
  default:
    return state;
  }
};

export default walletReducer;
