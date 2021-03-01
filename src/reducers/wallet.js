import { ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  expense: {
    // id: 0,
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
    // exchangeRates: {},
  },
};

const addExpense = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state, expense: action.payload };
  default:
    return state;
  }
};

export default addExpense;
