// Esse reducer será responsável por tratar as informações da pessoa usuária
import { GET_EMAIL } from '../actions';

const initialUser = {
  email: '',
};

export default function loginReducer(state = initialUser, action) {
  switch (action.type) {
  case GET_EMAIL:
    return { ...state, email: action.email };
  default:
    return state;
  }
}
