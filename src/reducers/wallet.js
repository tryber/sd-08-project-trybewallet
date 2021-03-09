// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: [],
  currencies: [],
  currenciesAPI: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_API':
    return { ...state };
  case 'GET_CURRENCY_FROM_API':
    return { ...state,
      currenciesAPI: action.payload.currencies,
      currencies: Object.keys(action.payload.currencies)
        .filter((coin) => coin !== 'USDT'),
    };
  case 'FAILED_REQUEST_TO_API':
    return { ...state, error: action.payload.error };
  case 'ADD_TO_WALLET':
    return {
      ...state,
      expenses: [...state.expenses, {
        id: action.payload.id,
        value: action.payload.value,
        description: action.payload.description,
        currency: action.payload.currency,
        method: action.payload.method,
        tag: action.payload.tag,
        exchangeRates: action.payload.currencies,
      }],
    };
  case 'DELETE_EXPENSE':
    return { ...state,
      expenses: [...state.expenses.filter((exp) => exp.id !== action.payload.id)] };
  case 'EDIT_EXPENSE':
    return { ...state,
      expenses: state.expenses.map((expense) => (expense.id === action.payload.id
        ? action.payload.exp : expense)) };
  default:
    return state;
  }
};

export default wallet;
