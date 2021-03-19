import {
  ADD_NEW_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
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
        expenses: [{ ...action.expense, id: 0 }],
      });
    }
    return ({
      ...state,
      expenses: [...state.expenses, {
        ...action.expense,
        id: state.expenses[expensesLength - 1].id + 1,
      }],
    });
  case REMOVE_EXPENSE:
    return ({
      ...state,
      expenses: state.expenses.length
        ? state.expenses.filter((expense) => expense.id !== action.expenseId)
        : [],
    });
  case EDIT_EXPENSE:
    return ({
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.expenseModified.id) {
          return action.expenseModified;
        }
        return expense;
      }),
    });
  default:
    return state;
  }
}

export default wallet;
