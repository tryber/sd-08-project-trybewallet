import { ADD_EXPENSE, SAVE_FETCH_CURRENCIES } from '../actions/ActionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      expenses: action.payload.objetctExpenses,
    };
  case SAVE_FETCH_CURRENCIES:
    return {
      currencies: action.payload.dataCurrencies,
    };
  default: return state;
  }
};

export default walletReducer;
