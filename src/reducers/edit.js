// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { EDIT, EDITING, EDIT_COMPLETE } from '../actions';

const initialWalletState = {
  edit: {},
};

function edit(state = initialWalletState, action) {
  switch (action.type) {
  case EDIT:
    return { ...state, item: action.payload, status: true, btnStatus: true };
  case EDITING:
    return { ...state, status: false, btnStatus: true };
  case EDIT_COMPLETE:
    return { ...state, item: {}, status: false, btnStatus: false };
  default:
    return state;
  }
}

export default edit;
