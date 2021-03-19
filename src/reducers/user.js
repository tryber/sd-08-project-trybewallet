import { USER_LOGIN } from '../actions/index';

const initialState = {
  email: '',
};

export default function user(state = initialState, action) {
  switch (action.type) {
  case USER_LOGIN:
    return { ...state, email: action.email };

  default:
    return state;
  }
}
