import { TOTAL_EXPENSE } from '../actions/index';

const WALLET_INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpenses: 0,
};

const walletReducer = (state = WALLET_INITIAL_STATE, action) => {
  switch (action.type) {
  case TOTAL_EXPENSE:
    return {
      ...state, totalExpenses: action.totalValue,
    };
  default:
    return state;
  }
};

export default walletReducer;
