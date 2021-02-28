import * as ActionTypes from '../common/ActionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editmode: false,
  editid: null,
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
      expenses: [...state.expenses.filter((i) => i.id !== payload.id), payload]
        .sort((a, b) => a.id - b.id),
    };
  case ActionTypes.WALLET_ENTER_EDIT_MODE:
    return {
      ...state,
      editmode: true,
      editid: action.id,
    };
  case ActionTypes.WALLET_EXIT_EDIT_MODE:
    return {
      ...state,
      editmode: false,
      editid: null,
    };

  default:
    return state;
  }
}
