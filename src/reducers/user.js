// Esse reducer será responsável por tratar as informações da pessoa usuária

import { EMAIL } from '../actions';

const initialStateUser = {
  email: '',
};

export default function user(state = initialStateUser, action) {
  switch (action.type) {
  case EMAIL:
    return { ...state, email: action.payload };
  default:
    return state;
  }
}
