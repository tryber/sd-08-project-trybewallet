// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  ADD_CURRENCIES_ON_STATE,
  ADD_EXPENSE_ON_STATE,
  REMOVE_EXPENSE_FROM_STATE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCIES_ON_STATE:
    return { ...state, currencies: action.payload };
  case ADD_EXPENSE_ON_STATE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case REMOVE_EXPENSE_FROM_STATE:
    return { ...state,
      expenses: [
        ...state.expenses.filter((expense) => expense.id !== action.payload.id),
      ] };
  default:
    return state;
  }
};

export default walletReducer;
