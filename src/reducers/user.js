import { LOGIN } from '../actions';

const INITIAL_STATE = {};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return action.payload;
  default:
    return state;
  }
};

export default user;
