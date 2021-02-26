// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import * as Actions from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  loading: false,
  totalExpense: 0,
};

function expenseObj(information, id) {
  const {
    description,
    value,
    currency,
    method,
    tag,
    exchangeRates,
  } = information;
  return {
    id,
    value,
    currency,
    method,
    tag,
    description,
    exchangeRates,
  };
}

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Actions.ACTION_BEGIN:
    return {
      ...state,
      loading: true,
    };
  case Actions.ACTION_SUCCESS:
    return {
      ...state,
      loading: action.loading,
      expenses: [
        ...state.expenses,
        expenseObj(action.information, state.expenses.length),
      ],
    };
  case Actions.DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  default:
    return state;
  }
};

export default wallet;
