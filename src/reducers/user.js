import { LOGIN_USER } from '../actions/ActionTypes';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_USER:
    return { email: action.payload.email };
  default: return state;
  }
};

export default user;
