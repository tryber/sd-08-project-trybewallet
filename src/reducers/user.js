// Esse reducer será responsável por tratar as informações da pessoa usuária
import {
  LOGIN,
} from '../actions';

const INICIAL_STATE = {
  email: '',
  password: '',
};

const userReducer = (state = INICIAL_STATE, { type, email, password }) => {
  switch (type) {
  case LOGIN:
    return {
      ...state,
      email,
      password,
    };
  default:
    return state;
  }
};

export default userReducer;
