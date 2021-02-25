import { LOGIN } from '../actions';

function user(state = {}, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.payload.email };
  default:
    return state;
  }
}

export default user;
