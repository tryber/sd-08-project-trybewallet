// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
  isFetching: true,
  total: 0,
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case 'GET_CURRENCIES':
  {
    const currenciesArray = Object.keys(action.value);
    let indice = currenciesArray.indexOf('USDT');
    while (indice >= 0) {
      currenciesArray.splice(indice, 1);
      indice = currenciesArray.indexOf('USDT');
    }
    return { ...state, currencies: currenciesArray, isFetching: false };
  }
  case 'ADD_REGISTER':
  {
    const { total } = state;
    const soma = action.value.value * action.value.exchangeRates[action.value.currency]
      .ask + total;
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.value }],
      total: soma,
    };
  }
  default:
    return state;
  }
}

export default wallet;
