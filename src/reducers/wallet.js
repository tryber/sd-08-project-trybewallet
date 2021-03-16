import * as ActionTypes from '../common/ActionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};
export default function reducer(state = INITIAL_STATE, action) {
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
      expenses: [...state.expenses, { ...payload }],
    };
  case ActionTypes.WALLET_DELEXP:
    return {
      ...state,
      expenses: [...state.expenses.filter((i) => i.id !== payload)],
    };
  case ActionTypes.WALLET_EDITEXP:
    return {
      ...state,
      expenses: [...state.expenses.filter((i) => i.id !== payload.id), ...payload],
    };

  default:
    return state;
  }
}
