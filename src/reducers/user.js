import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: undefined,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default userReducer;
