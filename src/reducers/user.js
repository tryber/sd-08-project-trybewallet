// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN } from '../actions/index';

const initialLoginState = { user: { email: '' } };

export default function loginReducer(state = initialLoginState, { type, payload }) {
  switch (type) {
  case LOGIN:
    return { ...state, ...payload };
  default:
    return state;
  }
}
