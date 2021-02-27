// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const InitialState = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};
// moedas da carteira
export const inwalletReducer = (state = InitialState, action) => {
  switch (action.type) {
  case 'MOEDA':
    return {
      ...state,
      wallet: {
        currencies: [action.currencies],
      },
    };

  default:
    return state;
  }
};

// se SAIR dinheiro na carteira
export const outwalletReducer = (state = 'Initial State', action) => {
  switch (action.type) {
  case 'MONEI_OUT':
    return {
      ...state,
      wallet: {
        expenses: [action.expenses],
      },
    };

  default:
    return state;
  }
};
