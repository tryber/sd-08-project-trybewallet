// Esse reducer será responsável por tratar as informações da pessoa usuária

import { SAVE_EMAIL, SAVE_PASSWORD } from '../actions';

const LOGIN_INITIAL_STATE = {
  email: '',
  password: '',
};

const userReducer = (state = LOGIN_INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EMAIL:
    return {
      ...state, email: action.email,
    };

  case SAVE_PASSWORD:
    return {
      ...state, password: action.password,
    };

  default:
    return state;
  }
};

export default userReducer;
