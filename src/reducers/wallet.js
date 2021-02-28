// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'UPAPI':
    return { ...state, currencies: action.value };
  case 'UPEXPENSES':
    return { ...state, expenses: [...state.expenses, action.UPexpenses] };
  default:
    return state;
  }
};

export default walletReducer;
