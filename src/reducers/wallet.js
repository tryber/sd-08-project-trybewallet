// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  REQUEST_QUOTATION,
  QUOTATION_DATA,
  EXPENCE_DATA,
  DEL_EXPENCE,
  EDIT_EXPENCE,
  UPDATE_EXPENCE } from '../actions';

const INITIAL_STATE = {
  totalExpenses: 0,
  expenses: [],
  editing: false,
  idToEdit: '',
};

function wallet(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case REQUEST_QUOTATION:
    return { ...state,
      isFetching: payload.isFetching };
  case QUOTATION_DATA:
    return { ...state,
      currencies: Object.keys(payload.allquotation) };
  case EXPENCE_DATA:
    return { ...state,
      expenses: state.expenses.concat(payload.expenses) };
  case DEL_EXPENCE:
    return { ...state,
      expenses: state.expenses
        .filter((eachExpence) => eachExpence.id !== payload.id) };
  case EDIT_EXPENCE:
    return { ...state, editing: !state.editing, idToEdit: payload.id };
  case UPDATE_EXPENCE:
    return { ...state,
      expenses: state.expenses.map((cada) => {
        if (cada.id === state.idToEdit) {
          return {
            ...cada,
            id: payload.expenceEdited.id,
            value: payload.expenceEdited.value,
            description: payload.expenceEdited.description,
            currency: payload.expenceEdited.currency,
            method: payload.expenceEdited.method,
            tag: payload.expenceEdited.tag,
            exchangeRates: payload.expenceEdited.exchangeRates,
          };
        } return cada;
      }) };
  default:
    return state;
  }
}

export default wallet;
