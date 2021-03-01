// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const InitialState = {
  currencies: [],
  expenses: [],
};
// moedas da carteira
export default function inwalletReducer(state = InitialState, action) {
  switch (action.type) {
  case 'MOEDA':
    return {
      ...state,
      wallet: {
        currencies: [action.currencies],
      },
    };
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
}
