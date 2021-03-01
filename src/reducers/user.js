import { Types } from '../actions/user';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Types.SAVE_EMAIL:
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default user;
