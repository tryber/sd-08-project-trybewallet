const DEFAULT_STATE = { currencies: ['BRL'],
  expenses: [],
  total: 0,
  apiResponse: ['BRL'],
  fetched: false,
  id: 0,
  latesteCurrency: '',
  cashList: [] };

const wallet2 = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case 'Item':
    return {
      ...state,
      id: state.id + 1,
      // total: Number(action.payload.value) * Number(action.payload.exchangeRates[action.payload.currency].ask) + state.total,
      cashList: [...state.cashList,
        (Number(action.payload.value))
        * (Number(action.payload.exchangeRates[action.payload.currency].ask))],
      latesteCurrency: action.payload.exchangeRates[action.payload.currency].ask,
    };
  case 'DELETE_ITEM':
    return {
      ...state,
      total: (state.total - action.sub),
      expenses: [...state.expenses.filter((element) => action.payload !== element.id)],
    };
  case 'FETCH_REQUEST':
    return {
      ...state, fetched: action.payload,
    };
  default:
    return state;
  }
};
export default wallet2;
