import { ADD_EXPENSE, DEL_EXPENSE } from '../actions';

const INITIAL_STATE = {
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, action.payload] };
  case DEL_EXPENSE:
    return { ...state,
      expenses: [state.expenses.filter((expense) => expense !== action.item)] };
  default:
    return state;
  }
};

export default wallet;
