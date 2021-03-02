import { ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state, expenses: state.expenses.concat(action.payload) };
  default:
    return state;
  }
};

export default wallet;
