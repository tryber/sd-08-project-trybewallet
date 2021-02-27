// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SAVE_USER_EMAIL, INITIAL_STATE } from '../components/Allconsts';
import addUserEmail from '../actions/user';

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER_EMAIL:
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default user;
