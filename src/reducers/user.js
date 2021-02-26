// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER_EMAIL, INITIAL_STATE } from '../components/Allconsts';

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_EMAIL:
    return { ...state, userEmail: action.email, userPassword: action.password };
  default:
    return state;
  }
};

export default user;
