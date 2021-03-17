import { CURRENCIES, EXPANSES } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};
export default function wallet(state = initialState, action) {
  switch (action.type) {
  case CURRENCIES:
    return { ...state, currencies: action.payload };
  case EXPANSES:
    return { ...state, expenses: [...state.expenses, action.payload] };
  default:
    return state;
  }
}
