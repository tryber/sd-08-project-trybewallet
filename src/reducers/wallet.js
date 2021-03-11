// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { REQUEST_QUOTATION, QUOTATION_DATA, EXPENCE_DATA, DEL_EXPENCE } from '../actions';

const INITIAL_STATE = {
  totalExpenses: 0,
  expenses: [],
};

function wallet(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case REQUEST_QUOTATION:
    return { ...state,
      isFetching: payload.isFetching };
  case QUOTATION_DATA:
    return { ...state,
      currencies: payload.allquotation };
  case EXPENCE_DATA:
    return { ...state,
      expenses: state.expenses.concat(payload.expenses) };
  case DEL_EXPENCE:
    return { expenses: state.expenses
      .filter((eachExpence) => eachExpence.id !== payload.id) };
  default:
    return state;
  }
}

export default wallet;
