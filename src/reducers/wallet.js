import { ADD_EXPENSE, SAVE_CURRENCIES, UPDATE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  idCount: 0,
};

const updateTotal = (state, action) => {
  let expenses = [];
  if (action.type === 'UPDATE_EXPENSE') {
    expenses = action.expenses;
  } else {
    expenses = state.expenses.concat(action.expense);
  }
  const total = expenses.reduce((acc, expense) => (
    parseFloat(
      (acc + expense.value * expense.exchangeRates[expense.currency].ask).toFixed(2),
    )
  ), 0);
  return total;
};

const addExpense = (state = INITIAL_STATE, action) => {
  const { idCount, expenses } = state;
  const expense = {
    id: idCount,
    ...action.expenses,
  };
  return {
    ...state,
    expenses: [
      ...expenses,
      expense,
    ],
    idCount: idCount + 1,
  };
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case UPDATE_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
      totalValue: updateTotal(state, action),
    };
  case ADD_EXPENSE:
    return addExpense(state, action);
  default:
    return state;
  }
};

export default wallet;

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
