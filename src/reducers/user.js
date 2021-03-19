import { LOGIN_USER } from '../actions';

const INITIAL_STATE = {
  email: 'test@email.com',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_USER:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
