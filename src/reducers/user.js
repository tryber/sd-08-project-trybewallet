// Esse reducer será responsável por tratar as informações da pessoa usuáriaimport { SIGN_IN } from '../actions';
import { LOGIN } from '../actions/actionsType';

const INITIAL_STATE = { email: '' };

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.email };
  default:
    return state;
  }
}
