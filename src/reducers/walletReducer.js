// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCIES,
  GET_CURRENCIES_ADD_EXPENDITURE,
  DEL_EXPENSE,
  EDIT_EXPENSE,
  localCurrency,
} from '../const';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
  edition: [],
};

function currenciesSelect(action) {
  if (action.type === GET_CURRENCIES) {
    const arrayCurr = Object.keys(action.currencies);
    const usdtIndex = arrayCurr.indexOf('USDT');
    return [...arrayCurr.slice(0, usdtIndex), ...arrayCurr.slice(usdtIndex + 1)];
  }
}

function wallet(state = INITIAL_STATE, action) {
  const list = currenciesSelect(action);
  let total = 0;
  let delElement = [];
  let edition = {};
  const totalInState = state.expenses.reduce((acc, curr) => (acc + ({
    ...curr.exchangeRates, BRL: localCurrency }[curr.currency].ask * curr.value)), 0);
  if (action.type === GET_CURRENCIES_ADD_EXPENDITURE) {
    total = parseFloat((totalInState + action.expenses.value
      * { ...action.exchange, BRL: localCurrency }[action.expenses.currency].ask)
      .toFixed(2));
  }
  if (action.type === DEL_EXPENSE) {
    delElement = (state.expenses.filter((expense) => (expense !== action.expense)));
    total = parseFloat((totalInState - action.expense.value
      * { ...action.expense.exchangeRates, BRL: localCurrency }[action.expense.currency]
        .ask).toFixed(2));
  }
  if (action.type === EDIT_EXPENSE) {
    edition = state.expenses.map((exp) => {
      if (exp.id === action.editExpense.id) return { ...exp, ...action.editExpense };
      return exp;
    });
  }
  switch (action.type) {
  case GET_CURRENCIES:
    return ({ ...state, currencies: [...state.currencies, ...list] });
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
      total,
      isFetching: false,
    });
  case DEL_EXPENSE:
    return ({ ...state, expenses: delElement, total });
  case EDIT_EXPENSE:
    return ({ ...state, expenses: edition });
  default:
    return state;
  }
}

export default wallet;
