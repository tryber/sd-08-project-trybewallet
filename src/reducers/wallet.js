const WALLET = ({
  currencies: [],
  expenses: [],
  idCount: 0,
});

const walletReducer = (state = WALLET, action) => {
  switch (action.type) {
  case 'USER_CURRENCIES':
    return { ...state, currencies: action.payload };
  case 'ADD_EXPENSE': {
    const newExpense = {
      id: state.idCount,
      ...action.payload,
    };
    return { ...state,
      expenses: [...state.expenses, newExpense],
      idCount: state.idCount + 1 };
  }
  default:
    return state;
  }
};

export default walletReducer;
