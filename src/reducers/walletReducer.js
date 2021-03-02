// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCIES,
  GET_CURRENCIES_ADD_EXPENDITURE,
  FLAG,
} from '../const';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  total: 0.00,
};

function wallet(state = INITIAL_STATE, action) {
  let list = [];
  let sum = 0;
  if (action.type === GET_CURRENCIES) {
    const arrayCurr = Object.keys(action.currencies);
    const usdtIndex = arrayCurr.indexOf('USDT');
    list = [...arrayCurr.slice(0, usdtIndex), ...arrayCurr.slice(usdtIndex + 1)];
  }
  if (action.type === GET_CURRENCIES_ADD_EXPENDITURE) {
    sum = parseFloat((state.total + action.expenses.value
      * [...Object.values(action.exchange), { code: 'BRL', ask: 1 }]
        .find((exg) => exg.code === action.expenses.currency).ask)
      .toFixed(2));
  }
  switch (action.type) {
  case GET_CURRENCIES:
    return ({
      ...state,
      currencies: [...state.currencies, ...list],
    });
  case GET_CURRENCIES_ADD_EXPENDITURE:
    return ({
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.expenses.length,
          ...action.expenses,
          exchangeRates: { ...state.exchangeRates, ...action.exchange },
        },
      ],
      total: sum,
      isFetching: false,
    });
  case FLAG:
    return ({
      ...state,
      isFetching: action.isFetching,
    });
  default:
    return state;
  }
}

export default wallet;
