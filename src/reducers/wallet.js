// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const WALLET = ({
  currencies: [],
  expenses: [],
});

const walletReducer = (state = WALLET, action) => {
  switch (action.type) {
  case 'USER_CURRENCIES':
    return { ...state };
  case 'REQUEST_CURRENCIES_SUCCESS':
    return { ...state, currencies: action.value };
  default:
    return state;
  }
};

export default walletReducer;
