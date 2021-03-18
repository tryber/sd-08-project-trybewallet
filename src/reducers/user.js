// Esse reducer será responsável por tratar as informações da pessoa usuária
import { DISPATCH_EMAIL } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DISPATCH_EMAIL:
    return {
      ...state,
      user: { email: action.userEmail },
    };
  default:
    return state;
  }
}

export default user;
