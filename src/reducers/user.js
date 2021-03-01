import { Types } from '../actions';

const initialState = {
  email: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case Types.SAVE_EMAIL:
    return { ...state, email: action.payload };
  default:
    return state;
  }
}

export default user;
