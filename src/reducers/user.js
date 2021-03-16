import { SET_PASSWORD, SAVE_EMAIL } from '../common/actionTypes';
// import wallet from './wallet';

const INITIAL_STATE = {
  email: '',
  password: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_PASSWORD:
    return ({
      ...state,
      password: action.payload,
    });
  case SAVE_EMAIL:
    return ({
      ...state,
      email: action.payload,
    });
  default: return state;
  }
}
