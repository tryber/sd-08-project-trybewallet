import { LOGIN } from '../actions/user';

const user = (state = {}, action) => {
  switch (action.type) {
  case LOGIN.SAVE_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
