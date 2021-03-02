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
};

function wallet(state = INITIAL_STATE, action) {
  let list = [];
  if (action.type === 'GET_CURRENCIES') {
    const arrayCurr = Object.keys(action.currencies);
    const usdtIndex = arrayCurr.indexOf('USDT');
    list = [...arrayCurr.slice(0, usdtIndex), ...arrayCurr.slice(usdtIndex + 1)];
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
