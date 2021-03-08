import { ADD_EXPENSE, DEL_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state, expenses: [action.payload] };
  case DEL_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => action.payload !== expense.id),
    };
  default:
    return state;
  }
};

export default wallet;
