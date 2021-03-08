const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  loading: false,
  id: 0,
  exchangeRates: {},
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_EXCHENGES':
    return { ...state, loading: true };
  case 'GET_CURRENCIES':
    return { ...state, currencies: action.currency, loading: false };
  case 'GET_ALL_DATA':
    return { ...state, exchangeRates: action.exchangeRates };
  case 'ADD_EXPENSE':
    action.expense.id = state.id;
    action.expense.exchangeRates = state.exchangeRates;
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      id: state.id + 1 };
  default:
    return state;
  }
}

export default reducer;
