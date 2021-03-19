// Esse reducer será responsável por tratar as informações da pessoa usuária

import { Login } from '../actions/index';

const INITIAL_STATE = {
  user: {
    email: 'alguem@email.com',
  },
};

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
  case Login:
    return payload;

  default:
    return state;
  }
}
