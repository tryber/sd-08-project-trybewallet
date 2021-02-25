import { WALLET } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case WALLET:
    return {
      ...state,
      money: {},
    };
  default:
    return state;
  }
};

export default wallet;
