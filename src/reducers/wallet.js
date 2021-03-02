import { ADD_EXPENSE, FETCH_CURRENCIES } from '../actions/ActionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      expenses: action.payload.expenses,
    };
  case FETCH_CURRENCIES:
    return {
      currencies: action.payload.currencies,
    };
  default: return state;
  }
};

export default wallet;
