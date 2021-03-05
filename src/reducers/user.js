// Esse reducer será responsável por tratar as informações da pessoa usuária

import { SAVE_EMAIL } from '../const';

const INITIAL_STATE = {
  email: '',
  password: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_EMAIL:
    return { ...state, ...action.value };
  default:
    return state;
  }
}

export default user;
