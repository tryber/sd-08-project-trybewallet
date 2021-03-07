import { HANDLE_USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, { type, email }) => {
  switch (type) {
  case HANDLE_USER_LOGIN:
    return {
      ...state,
      email,
    };
  default:
    return state;
  }
};

export default userReducer;
