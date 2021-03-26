import {
  SAVE_EMAIL_USER,
} from '../actions';

const INITIAL_STATE_USER = {
  email: '',
};
export default function user(state = INITIAL_STATE_USER, action) {
  switch (action.type) {
  case SAVE_EMAIL_USER:
    return {
      ...state, email: action.payload };
  default:
    return state;
  }
}
