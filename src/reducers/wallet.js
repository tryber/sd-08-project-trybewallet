import { ADD_EXPENSE, FETCH_CURRENCIES, REMOVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state, expenses: state.expenses.concat(action.payload) };
  case REMOVE_EXPENSE:
    return { expenses: state.expenses.filter((item) => item.id !== action.payload) };
  case FETCH_CURRENCIES:
    return { ...state,
      currencies: Object.keys(action.payload)
        .filter((item) => item !== 'USDT') };
  default:
    return state;
  }
};

export default wallet;
