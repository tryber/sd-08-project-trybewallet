import { CHANGE_EDIT_STATUS } from '../actions';

const INITIAL_STATE = {
  isEditing: false,
};

const editReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_EDIT_STATUS:
    return {
      ...state,
      isEditing: action.payload.isEditing,
      id: action.payload.id,
    };
  default:
    return state;
  }
};

export default editReducer;
