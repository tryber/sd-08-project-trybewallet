import { ADD_EXPENSE, ADD_CURRENCIES, ADD_EXCHANGE, REMOVE_EXPENSE } from '../actions';

const initialState = {
  creatorID: 0,
  currencies: [],
  expenses: [],
  exchange: 'BRL',
};

function removeExpense(expenses, id) {
  return expenses.filter((expense) => {
    const expenseID = expense.id;
    return expenseID !== id;
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
  default:
    return state;
  }
}
