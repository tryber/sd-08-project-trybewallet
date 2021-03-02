import {
  FAILED_REQUEST,
  HANDLE_INPUTS,
  GET_EXCHANGE_RATES,
  CLEAR_INPUT_HANDLER,
  ADD_EXPENSES_INDEX,
  SET_ADDITION,
  EDIT_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  handlingInputs: [{
    id: '',
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
    exchangeRates: {},
  }],
  additionToExpenses: false,
  editionOfExpense: false,
  error: '',
};

export default function inputHandlerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FAILED_REQUEST:
    return {
      ...state,
      error: action.payload,
    };
  case HANDLE_INPUTS:
    return {
      ...state,
      handlingInputs: [{ ...state.handlingInputs[0], ...action.payload }],
    };
  case GET_EXCHANGE_RATES:
    return {
      ...state,
      handlingInputs: [{
        ...state.handlingInputs[0],
        exchangeRates: { ...action.payload },
      }],
    };
  case ADD_EXPENSES_INDEX:
    return {
      ...state,
      handlingInputs: [{ ...state.handlingInputs[0], ...action.payload.id }],
    };
  case CLEAR_INPUT_HANDLER:
    return INITIAL_STATE;
  case SET_ADDITION:
    return {
      ...state,
      additionToExpenses: !state.additionToExpenses,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      handlingInputs: action.payload,
      editionOfExpense: !state.editionOfExpense,
    };
  default:
    return state;
  }
}
