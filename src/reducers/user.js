import { LOGIN_USER_EMAIL } from '../actions/index';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_USER_EMAIL:
    return { ...state,
      email: action.email,
    };
  default:
    return state;
  }
}

export default userReducer;
