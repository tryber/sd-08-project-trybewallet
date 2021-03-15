import { SAVE_EMAIL } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

const saveUser = (state = INITIAL_STATE, { type, email }) => {
  switch (type) {
  case SAVE_EMAIL:
    return {
      ...state,
      email,
    };
  default:
    return state;
  }
};

export default saveUser;