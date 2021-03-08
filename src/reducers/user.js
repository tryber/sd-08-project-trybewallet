// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN } from '../actions/actionsType';

const INITIAL_STATE = { email: '' };

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { email: action.email };
  default:
    return state;
  }
}
