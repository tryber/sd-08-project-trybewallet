import { LOGIN } from '../actions';
const USER_INITIAL_STATE = {
  email: '',
};

const userReducer = (state = USER_INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.payload.email,
    };
  default:
    return state;
  }
};

export default userReducer;
