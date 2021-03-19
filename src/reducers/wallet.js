// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { DISPATCH_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  convertedValues: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DISPATCH_EXPENSES:
    return {
      ...state,
      convertedValues: [...state.convertedValues, action.totalValue],
      expenses: [...state.expenses, {
        id: state.expenses.length,
        value: action.state.value,
        description: action.state.description,
        currency: action.state.currency,
        method: action.state.method,
        tag: action.state.tag,
        exchangeRates: action.currency,
      }],
    };
  default:
    return state;
  }
}

export default wallet;
