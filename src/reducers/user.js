// Esse reducer será responsável por tratar as informações da pessoa usuária
import { DISPATCH_EMAIL } from '../actions';

const INITIAL_STATE = {};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DISPATCH_EMAIL:
    return {
      ...state,
      email: action.userEmail,
    };
  default:
    return state;
  }
}

export default user;
