// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import types from '../actions/types';

const initial = {
  currencies: [],
  expenses: [],
  expenseId: 0,
  editing: false,
  expenseToEdit: '',
};

const editedExpense = (prevExpenses, edited) => {
  const expenses = prevExpenses.map((item) => {
    if (item.id === edited.id) {
      item = { ...edited };
    }
    return item;
  });
  return expenses;
};

export default (state = initial, action) => {
  const expenseToAdd = {
    id: state.expenseId,
    ...action.payload,
  };
  switch (action.type) {
  case types.FETCH_CURRENCIES:
    return {
      ...state,
      currencies: [...action.payload],
    };
  case types.ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, expenseToAdd],
      expenseId: state.expenseId + 1,
    };
  case types.DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case types.EDIT_EXPENSE:
    return {
      ...state,
      editing: true,
      expenseToEdit: action.payload,
    };
  case types.SAVE_EXPENSE:
    return {
      ...state,
      editing: false,
      expenseToEdit: '',
      expenses: editedExpense(state.expenses, action.payload),
    };
  default:
    return state;
  }
};
// Nota mental: sempre retornar o estado anterior
// junto com o update recebido pela action.
