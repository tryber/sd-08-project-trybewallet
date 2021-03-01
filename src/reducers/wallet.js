const WALLET = ({
  currencies: [],
  expenses: [],
  idCount: 0,
});

const walletReducer = (state = WALLET, action) => {
  switch (action.type) {
  case 'USER_CURRENCIES':
    return { ...state, currencies: action.payload };
  case 'ADD_EXPENSE':
    return { ...state, expenses: action.payload, idCount: state.idCount + 1 };
  default:
    return state;
  }
};

export default walletReducer;
