// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SAVE_EXPENSES, SAVE_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SAVE_CURRENCIES:
    return { ...state,
      currencies: payload.currencies };
  case SAVE_EXPENSES:
    return { ...state,
      expenses: [...state.expenses, payload.expenses],
    };
  default:
    return state;
  }
}
