import {
  START_EDIT,
  SAVE_EDIT,
  COMPLETE_EDIT,
} from '../actions/index';

const initialEditState = {
  currencies: [],
  expenses: [],
  edit: {},
  editStatus: false,
};

export default function editReducer(state = initialEditState, action) {
  switch (action.type) {
  case START_EDIT:
    return { ...state, edit: action.payload };
  case SAVE_EDIT:
    return { ...state, expenses: [...action.payload] };
  case COMPLETE_EDIT:
    return { ...state, editStatus: false };
  default:
    return state;
  }
}
