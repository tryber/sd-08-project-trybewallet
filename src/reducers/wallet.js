// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCIES,
  GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_ERROR,
  ADD_EXPENSE,
  DELETE_EXPENSE,
} from '../actions/index';

const initialWalletState = {
  currencies: [],
  expenses: [],
};

export default function walletReducer(state = initialWalletState, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state };
  case GET_CURRENCIES_SUCCESS:
    return { ...state, currencies: action.payload };
  case GET_CURRENCIES_ERROR:
    return { ...state, error: action.payload };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case DELETE_EXPENSE:
    return { ...state, expenses: [...action.payload] };
  default:
    return state;
  }
}
