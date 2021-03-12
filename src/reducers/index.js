import { SET_EMAIL, SET_PASSWORD, SAVE_EMAIL } from '../common/actionTypes';
// import wallet from './wallet';

const INITIAL_STATE = {
  user: {},
  email: '',
  password: '',
  wallet: {
    currencies: [
      'USD',
      'USDT',
      'CAD',
      'EUR',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
    ],
    expenses: [],
  },
};

const state = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_EMAIL:
    return ({
      ...state,
      email: action.payload,
    });
  case SET_PASSWORD:
    return ({
      ...state,
      password: action.payload,
    });
  case SAVE_EMAIL:
    return ({
      ...state,
      user: action.payload,
    });
  default: return state;
  }
};

export default state;
