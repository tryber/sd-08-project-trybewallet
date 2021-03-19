// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import types from '../types';

const initialState = {
  currencies: {},
  error: '',
  expenses: [],
  total: 0,
};

function addExpense(state = {}, action = {}) {
  const expenses = state.expenses.concat([{
    id: state.expenses.length, ...action.expense,
  }]);
  return {
    ...state,
    expenses,
    total: expenses.reduce((acc, cur) => {
      const rate = cur.exchangeRates[cur.currency];
      acc += parseFloat((parseFloat(cur.value) * rate.ask).toFixed(2));
      return acc;
    }, 0),
  };
}

function deleteExpense(state = {}, action = {}) {
  const filteredExpenses = state.expenses.filter((item) => item.id !== action.expense.id);
  return {
    ...state,
    expenses: filteredExpenses,
    total: filteredExpenses.reduce((acc, cur) => {
      const rate = cur.exchangeRates[cur.currency];
      acc += parseFloat((parseFloat(cur.value) * rate.ask).toFixed(2));
      return acc;
    }, 0),
  };
}

function wallet(state = initialState, action) {
  switch (action.type) {
  case types.REQUEST_COIN:
    return {
      ...state, currencies: action.payload,
    };
  case types.FAILED_REQUEST:
    return {
      ...state, error: action.payload,
    };
  case types.ADD_EXPENSE:
    return addExpense(state, action);
  case types.DELETE_EXPENSE:
    return deleteExpense(state, action);
  default:
    return state;
  }
}

export default wallet;
