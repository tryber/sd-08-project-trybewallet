// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: [],
  currencies: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_API':
    return { ...state };
  case 'GET_CURRENCY_FROM_API':
    return { ...state, currencies: action.payload.currencies };
  case 'FAILED_REQUEST_TO_API':
    return { ...state, error: action.payload.error };
  case 'ADD_TO_WALLET':
    return {
      ...state,
      expenses: [...state.expenses, {
        id: state.expenses.length,
        value: action.payload.value,
        description: action.payload.description,
        currency: action.payload.currency,
        method: action.payload.method,
        tag: action.payload.tag,
        exchangeRates: action.payload.exchangeRates,
      }],
    };
  default:
    return state;
  }
};

export default wallet;
