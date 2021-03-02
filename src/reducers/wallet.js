import { ADD_WALLET } from '../actions/ActionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_WALLET:
    return {
      currencies: action.payload.currencies,
      expenses: action.payload.expenses,
    };
  default: return state;
  }
};

export default wallet;
