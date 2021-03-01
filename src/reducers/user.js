import { SAVE_EMAIL } from '../actions';

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
