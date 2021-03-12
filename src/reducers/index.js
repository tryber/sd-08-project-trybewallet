import { SET_EMAIL, SET_PASSWORD, SAVE_EMAIL } from '../common/actionTypes';
// import wallet from './wallet';

const INITIAL_STATE = {
  user: {},
  email: '',
  password: '',
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_EMAIL:
    return ({
      ...state,
      email: action.payload,
    });
  case SET_PASSWORD:
    return ({
      ...state,
      password: action.payload,
    });
  case SAVE_EMAIL:
    return ({
      ...state,
      user: action.payload,
    });
  default: return state;
  }
}
