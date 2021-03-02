// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SAVE_USER_EMAIL, SAVE_USER_PASSWORD } from '../actions/user';

const initialStateUser = { email: '', password: '' };
const user = (state = initialStateUser, action) => {
  switch (action.type) {
  case SAVE_USER_EMAIL:
    return { ...state,
      email: action.payload,
    };
  case SAVE_USER_PASSWORD:
    return {
      ...state,
      password: action.payload,
    };
  default:
    return state;
  }
};

export default user;
