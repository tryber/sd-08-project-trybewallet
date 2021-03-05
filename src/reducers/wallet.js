import { ADD_EXPENSE, SAVE_FETCH_CURRENCIES } from '../actions/ActionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  case SAVE_FETCH_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  default: return state;
  }
};

export default walletReducer;
