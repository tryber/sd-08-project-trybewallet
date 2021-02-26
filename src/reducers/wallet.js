import { GET_CURRENCIES, REQUEST_API_CURRENCIES, ADD_EXPENSE } from '../actions';

export const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export const currenciesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API_CURRENCIES:
    return state;
  case GET_CURRENCIES:
    return { ...state, currencies: action.data };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  default:
    return state;
  }
};
