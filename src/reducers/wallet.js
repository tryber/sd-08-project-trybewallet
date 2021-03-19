// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { DISPATCH_EXPENSES, DISPATCH_DELETE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DISPATCH_EXPENSES:
    return {
      ...state,
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
  case DISPATCH_DELETE:
    return {
      ...state,
      expenses: [
        ...state.expenses.filter((expense) => expense.id !== action.expense.id),
      ],
    };
  default:
    return state;
  }
}

export default wallet;
