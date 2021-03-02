// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import * as ActionTypes from '../actions/index';

console.log(ActionTypes);
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editmode: false,
  editid: null,
};

export default function inwalletReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
  case ActionTypes.addCurrency:

    return {
      ...state,
      currencies: [...payload],
    };
  case ActionTypes.addExpense:

    return {
      ...state,
      expenses: [...state.expenses, { ...payload }],
    };
  case ActionTypes.delExpense:

    return {
      ...state,
      expenses: [...state.expenses.filter((i) => i.id !== payload)],
    };
  case ActionTypes.editExpense:

    return {
      ...state,
      expenses: [...state.expenses.filter((i) => i.id !== payload.id), payload]
        .sort((a, b) => a.id - b.id),
    };
  case ActionTypes.enterEditMode:

    return {
      ...state,
      editmode: true,
      editid: action.id,
    };
  case ActionTypes.exitEditMode:

    return {
      ...state,
      editmode: false,
      editid: null,
    };

  default:
    return state;
  }
}
