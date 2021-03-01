import { UPDATE_EXCHANGE, UPDATE_TAG, UPDATE_METHOD,
  UPDATE_CURRENCY, UPDATE_DESCRIPTION, UPDATE_VALUE } from '../consts';

const initialState = {
  id: 0,
  value: 0,
  description: '',
  currency: '',
  method: '',
  tag: '',
  exchangeRates: {},
};

const expense = (state = initialState, { type, payload }) => {
  switch (type) {
  case UPDATE_EXCHANGE:
    return { ...state, ...payload };
  case UPDATE_TAG:
    return { ...state, ...payload };
  case UPDATE_METHOD:
    return { ...state, ...payload };
  case UPDATE_CURRENCY:
    return { ...state, ...payload };
  case UPDATE_DESCRIPTION:
    return { ...state, ...payload };
  case UPDATE_VALUE:
    return { ...state, ...payload };
  default:
    return state;
  }
};

export default expense;
