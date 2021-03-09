const INITIAL_STATE = {
  expenses: [],
  auxiliar: {
    arrFinal: ['USD', 'ADS'],
    arrDeValores: [1, 1, 1],
    valor: 0,
  },
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_DESPESA':
    return { ...state, expenses: [...state.expenses, action.expenses] };
  case 'ADD_AUXILIAR':
    return { ...state, auxiliar: action.auxiliar };
  case 'DELETE_EXPENSES':
    return {
      ...state,
      expenses: [
        ...state.expenses
          .filter(({ id }) => id !== action.id),
      ],
    };
    // esse case foi adaptado a partir da criação de Ana Karine.
    // https://github.com/tryber/sd-08-project-trybewallet/blob/579ea98be56e308130fb95770839b3a0dffdcc3e/src/reducers/wallet.js
  default:
    return state;
  }
}
