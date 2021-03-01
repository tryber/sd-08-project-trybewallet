const INITIAL_STATE = {
  wallet: {
    currencies: ['BRL'],
    expenses: [0],
  },
};

const walletRedux = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'WALLET_EXPENSES':
    return { ...state, expenses: action.value };

  case 'WALLET_CURRENCIES':
    return { ...state, currencies: action.value };

  default:
    return state;
  }
};

export default walletRedux;
