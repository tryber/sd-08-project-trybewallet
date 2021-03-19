// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// const save = '(Number(action.payload.value)) * (Number(action.payload.exchangeRates[action.payload.currency].ask)) + state.total';
const DEFAULT_STATE = { currencies: ['BRL'], expenses: [], total: 0, apiResponse: ['BRL'], fetched: false, id: 0, latesteCurrency: '', cashList: [], edit: false };
const wallet = (state = DEFAULT_STATE, action) => {
  const totalll = state.expenses.reduce((a, b) => (a + b.exchangeRates[b.currency].ask * b.value), 0);
  console.log(totalll);
  switch (action.type) {
  case 'FETCH_REQUEST_SUCESS':
    return {
      ...state, currencies: action.payload,
    };
  case 'Item':
    return {
      ...state,
      // total: totalll,
      total: Number(action.payload.value) * Number(action.payload.exchangeRates[action.payload.currency].ask) + state.total,
      expenses: [...state.expenses, action.payload],
    };
  case 'DELETE_ITEM':
    return {
      ...state,
      // total: (state.total - state.cashList[action.payload]),
      total: (totalll - action.sub),
      expenses: [...state.expenses.filter((element) => action.payload !== element.id)],
    };
  // case 'EDIT':
  //   return {
  //     // ...state, edit: state.expenses.filter((element) => element.id === action.payload),
  //     ...state, edit: action.payload,

  //   };
  default:
    return state;
  }
};

export default wallet;
