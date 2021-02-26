import { ADD_EXPENSE } from '../actions';

const INITIAL_STATE = [];

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return [...state, action.payload];
  default:
    return state;
  }
};

export default wallet;
