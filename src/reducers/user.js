import { USER_EMAIL } from '../actions/index';

const initialState = {
  email: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case USER_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}

export default user;
