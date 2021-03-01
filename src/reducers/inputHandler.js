import {
  FAILED_REQUEST,
  HANDLE_INPUTS,
  GET_EXCHANGE_RATES,
  CLEAR_INPUT_HANDLER,
  ADD_EXPENSES_INDEX,
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
  default:
    return state;
  }
}
