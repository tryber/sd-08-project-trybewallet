import {
  ADD_NEW_EXPENSE,
  REMOVE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  const expensesLength = state.expenses.length;
  switch (action.type) {
  case ADD_NEW_EXPENSE:
    if (!expensesLength) {
      return ({
        ...state,
        expenses: [{ id: 0, ...action.expense }],
      });
    }
    return ({
      ...state,
      expenses: [...state.expenses, {
        id: state.expenses[expensesLength - 1].id + 1,
        ...action.expense,
      }],
    });
  case REMOVE_EXPENSE:
    return ({
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.expenseId),
    });
  default:
    return state;
  }
}

export default wallet;
