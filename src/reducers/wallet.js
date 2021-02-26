// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SAVE_CURR, ADD_EXP, DEL_EXP, EDIT, EDITING, EDIT_COMPLETE } from '../actions';

const initialWalletState = {
  currencies: {},
  expenses: [],
  edit: {},
};

function wallet(state = initialWalletState, action) {
  switch (action.type) {
  case SAVE_CURR:
    return { ...state, currencies: action.payload };
  case ADD_EXP:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case DEL_EXP:
    return { ...state, expenses: [...action.payload] };
  case EDIT:
    return { ...state, edit: { item: action.payload, status: true, btnStatus: true } };
  case EDITING:
    return { ...state, edit: { ...state.edit, status: false, btnStatus: true } };
  case EDIT_COMPLETE:
    return { ...state,
      expenses: [...action.payload],
      edit: { item: {}, status: false, btnStatus: false },
    };
  default:
    return state;
  }
}

export default wallet;
