import { SAVED_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVED_USER:
    return { ...state, email: action.user.email, password: action.user.password };
  default:
    return state;
  }
};

export default user;
