// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const DEFAULT_STATE = { currencies: ['BRL'], expenses: [], total: 0, apiResponse: ['BRL'], fetched: false, id: 0, latesteCurrency: '' };
const wallet = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case 'FETCH_REQUEST_SUCESS':
    return {
      ...state, apiResponse: action.payload,
    };
  case 'FETCH_REQUEST':
    return {
      ...state, fetched: action.payload,
    };
  case 'Item':
    return {
      ...state, expenses: [...state.expenses, action.payload], id: state.id + 1, total: (Number(action.payload.value)) * (Number(action.payload.exchangeRates[action.payload.currency].ask)) + state.total, latesteCurrency: action.payload.exchangeRates[action.payload.currency].ask,
    };
  default:
    return state;
  }
};

export default wallet;
