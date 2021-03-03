// Esse reducer será responsável por tratar todas as informações relacionadas as despesas
import INITIAL_STATE from './initialState';
import {
  FETCH_CURRENCIES,
  FETCH_CURRENCIES_DATA,
  ADD_EXPENSES,
  DELETE_EXPENSES,
} from '../actions';

export default function wallet(state = INITIAL_STATE, action) {
  const { expenses, total } = state;

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
  // Auxílio do especialista Ícaro Harry (plantão dia 01/03/2021)
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [
        ...expenses,
        {
          id: expenses.length,
          ...action.expense,
          exchangeRates: state.currenciesData,
        },
      ],
      total:
        total
        + Number(action.expense.value)
        * Number(state.currenciesData[action.expense.currency].ask),
    };
  // --------------------------------------------------------------
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: [
        ...expenses
          .filter(({ id }) => id !== action.expense),
      ],
    };
  default:
    return state;
  }
}
