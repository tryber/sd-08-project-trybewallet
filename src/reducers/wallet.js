// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_VALUE = 0;

const walletReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
  case 'USER_CURRENCIES':
    return { ...state + action.value.target.value };
  case 'USER_EXPENSES':
    return { ...state - action.value.target.value };
  default:
    return state;
  }
};

export default walletReducer;
