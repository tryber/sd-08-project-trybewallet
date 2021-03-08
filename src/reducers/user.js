import { SAVE_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const saveUser = (state = INITIAL_STATE, { type, value }) => {
  switch (type) {
  case SAVE_EMAIL:
    return {
      ...state,
      email: value,
    };
  default:
    return state;
  }
};

export default saveUser;
