import { USER_EMAIL } from '../actions';

const INIT_STATE = {
  email: '',
};

const userInfo = (state = INIT_STATE, action) => {
  switch (action.type) {
  case USER_EMAIL:
    return {
      ...state,
      email: action.payload,
    };

  default:
    return state;
  }
};

export default userInfo;
