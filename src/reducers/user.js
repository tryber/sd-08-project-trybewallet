// Esse reducer será responsável por tratar as informações da pessoa usuária
import { GET_USER_EMAIL } from '../actions/constants';

const INITIAL_STATE = {
  email: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_USER_EMAIL:
    return { ...state, email: action.UserEmail };
  default:
    return state;
  }
}
