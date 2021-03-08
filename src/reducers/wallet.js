// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_TRY, REQUEST_SUCCESS, REQUEST_FAIL, SAVE_EXPENSE } from '../const';

const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE_WALLET, action) {
  switch (action.type) {
  case REQUEST_TRY:
    return {
      ...state,
      loaging: true,
    };
  case REQUEST_SUCCESS:
    return {
      ...state,
      loaging: false,
      currencies: [action.currencies],
    };
  case REQUEST_FAIL:
    return {
      ...state,
      loaging: false,
      error: action.error,
    };
  case SAVE_EXPENSE:
    return {
      ...state, expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
}
