// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_CURRENCY,
  RECEIVE_CURRENCY_SUCCESS,
  RECEIVE_CURRENCY_FAILURE,
  COMPLETE_EXPENSES,
  DELETE_EXPENSES,
  EDIT_EXPENSES,
  ATUALIZAR_EXPENSES,
} from '../actions';

const INICIAL_STATE = {
  isFetching: false,
  isEditing: false,
  expenses: [],
};

const walletReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_CURRENCY_SUCCESS:
    return {
      ...state,
      exchangeRates: action.exchangeRates,
      isFetching: false,
    };
  case COMPLETE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.fullData],
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: action.newExpenses,
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      editExpense: action.editExp,
      isEditing: true,
    };
  case ATUALIZAR_EXPENSES:
    return {
      ...state,
      expenses: action.expensesCopy,
      isEditing: false,
    };
  case RECEIVE_CURRENCY_FAILURE:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};

export default walletReducer;
