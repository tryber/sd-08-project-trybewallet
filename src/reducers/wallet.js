const INITIAL_STATE = {
  currencies: ['BRL'],
  expenses: [],
};

const walletRedux = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'WALLET_EXPENSES':
    return { ...state, expenses: [...state.expenses, action.value] };

  case 'WALLET_CURRENCIES':
    return { ...state, currencies: [action.value] };

  case 'EXCLUIR':
    return { ...state,
      expenses: [...state.expenses.filter((item) => item.id !== action.value)],
    };

  default:
    return state;
  }
};

export default walletRedux;
