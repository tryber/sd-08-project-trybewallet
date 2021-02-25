// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN_USER } from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

export default function LoginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_USER:
    return {
      ...state,
      email: action.payload.email,
    };
  default:
    return state;
  }
}
