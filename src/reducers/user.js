// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN } from '../actions';

const INICIAL_STATE = {
  email: '',
  password: '',
};

const userReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default userReducer;
