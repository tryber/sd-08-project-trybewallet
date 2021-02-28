// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  ADD_CURRENCIES_ON_STATE,
  ADD_EXPENSE_ON_STATE,
  UPDATE_TOTAL_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpenses: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCIES_ON_STATE:
    return { ...state, currencies: action.payload };
  case ADD_EXPENSE_ON_STATE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case UPDATE_TOTAL_EXPENSES:
    return { ...state, totalExpenses: action.payload };
  default:
    return state;
  }
};

export default walletReducer;
