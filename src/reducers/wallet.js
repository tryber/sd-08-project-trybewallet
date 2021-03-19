import { REQUEST_CURRENCY, SAVE_DATA, EXCLUDES_DATA, EDIT_DATA,
  SET_EDIT_DATA } from '../actions/index';

const initialState = {
  currency: [],
  expenses: [],
  idToEdit: null,
  editor: false,
};

export default function wallet(state = initialState, action) {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return {
      ...state,
      currency: action.currency,
    };
  case SAVE_DATA:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case EXCLUDES_DATA:
    // console.log(action.excludeExpense);
    return {
      ...state,
      expenses: action.excludeExpense,
    };
  case EDIT_DATA:
    return {
      ...state,
      idToEdit: action.idToEdit,
      editor: true,
    };
  case SET_EDIT_DATA:
    return {
      ...state,
      expenses: [...state.expenses
        .filter((i) => Number(i.id) !== state.idToEdit), action.save]
        .sort((a, b) => a.id - b.id),
      editor: false,
    };

  default:
    return state;
  }
}
