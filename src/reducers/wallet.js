import {
  ADD_EXPENSE,
  ADD_CURRENCIES,
  ADD_EXCHANGE,
  REMOVE_EXPENSE,
  SELECT_EXPENSE,
  EDIT_EXPENSE,
} from '../actions';

const initialState = {
  creatorID: 0,
  editExpense: [],
  currencies: [],
  expenses: [],
  exchange: 'BRL',
  isExpenseEdit: false,
};

function removeExpense(expenses, id) {
  return expenses.filter((expense) => {
    const expenseID = expense.id;
    return expenseID !== id;
  });
}

function selectExpense(expenses, id) {
  return expenses.filter((expense) => {
    const expenseID = expense.id;
    return expenseID === id;
  });
}

export default function (state = initialState, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      creatorID: state.creatorID + 1,
      expenses: [...state.expenses, { id: state.creatorID, ...action.payload }],
    };
  case ADD_CURRENCIES:
    return {
      ...state, currencies: [...state.currencies, ...action.payload],
    };
  case ADD_EXCHANGE:
    return {
      ...state, exchange: action.payload,
    };
  case REMOVE_EXPENSE:
    return {
      ...state, expenses: [...removeExpense(state.expenses, action.payload)],
    };
  case SELECT_EXPENSE:
    console.log(action.payload);
    return {
      ...state,
      editExpense: [...selectExpense(state.expenses, action.payload)],
      expenses: [...removeExpense(state.expenses, action.payload)],
      isExpenseEdit: true,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      editExpense: [],
      isExpenseEdit: false,
    };
  default:
    return state;
  }
}
