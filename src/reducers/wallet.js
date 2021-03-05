import { ADD_EXPENCIE, FETCH_CURRENCY } from '../services/consts';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCY:
    return { ...state, currencies: action.payload };

  case ADD_EXPENCIE:
    return { ...state, expenses: [...state.expenses, action.payload] };

  default:
    return state;
  }
};

export default wallet;
