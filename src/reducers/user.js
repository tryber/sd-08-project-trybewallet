// Esse reducer será responsável por tratar as informações da pessoa usuária
import { GET_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_EMAIL:
    console.log('Teste');
    return { email: action.payload };
  default:
    return state;
  }
};

export default user;
