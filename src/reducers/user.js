// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER } from '../actions';

const INITIAL_STATE = {
  state: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER:
    return { ...state,
      email: action.payload.email,
      password: action.payload.password };
  default:
    return state;
  }
}
