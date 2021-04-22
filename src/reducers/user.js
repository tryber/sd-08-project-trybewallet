// Esse reducer será responsável por tratar as informações da pessoa usuária

import { USER_EMAIL } from '../common/typesAction';

export default function user(state = { email: '' }, action) {
  switch (action.type) {
  case USER_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}
