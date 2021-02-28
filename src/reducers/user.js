// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN } from '../store/consts';

const InitialState = { email: 'viviéesperta@diva.gatinha' };

const user = (state = InitialState, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default user;
