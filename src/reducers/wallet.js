import * as ActionTypes from '../common/ActionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};
export default function reducer(state = INITIAL_STATE, action) {
  console.log(state);
  const { type, payload } = action;
  switch (type) {
  case ActionTypes.WALLET_ADDCURR:
    return {
      ...state,
      currencies: [...payload],
    };
  case ActionTypes.WALLET_ADDEXP:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length + 1, ...payload }],
    };

  default:
    return state;
  }
}
