// Esse reducer será responsável por tratar as informações da pessoa usuária
import types from '../types';

function user(state = {}, action) {
  switch (action.type) {
  case types.CHANGE_EMAIL:
    return { ...state, email: action.email };
  default:
    return state;
  }
}

export default user;
