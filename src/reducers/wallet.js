// Esse reducer será responsável por tratar todas as informações relacionadas as despesas
import INITIAL_STATE from './initialState';
import {
  FETCH_CURRENCIES,
  FETCH_CURRENCIES_DATA,
  ADD_EXPENSES,
} from '../actions';

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_CURRENCIES:
    return {
      ...state,
      currencies: [...action.currencies],
    };
  case FETCH_CURRENCIES_DATA:
    return {
      ...state,
      currenciesData: action.currenciesData,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...action.expenses],
    };
  default:
    return state;
  }
}
