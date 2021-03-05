// Esse reducer será responsável por tratar as informações da pessoa usuária

import { SAVE_EMAIL } from '../actions/User';

const INITIAL_STATE = {
  email: '',
};

const User = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EMAIL:
    return {
      ...state,
      email: action.value,
    };
  default:
    return state;
  }
};

export default User;
