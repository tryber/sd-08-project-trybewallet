// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// import * as ActionTypes from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editmode: false,
  editid: null,
};

export default function inwalletReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (action.type) {
  case 'WALLET_ADDCURR':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'WALLET_ADDEXP':
    return {
      ...state,
      expenses: [...state.expenses, { ...payload }],
    };
  case 'WALLET_DELEXP':
    return {
      ...state,
      expenses: [...state.expenses.filter((i) => i.id !== payload)],
    };
  case 'WALLET_EDITEXP':
    return {
      ...state,
      expenses: [...state.expenses.filter((i) => i.id !== payload.id), payload]
        .sort((a, b) => a.id - b.id),
    };
  case 'WALLET_ENTER_EDIT_MODE':
    return {
      ...state,
      editmode: true,
      editid: action.id,
    };
  case 'WALLET_EXIT_EDIT_MODE':
    return {
      ...state,
      editmode: false,
      editid: null,
    };

  default:
    return state;
  }
}
