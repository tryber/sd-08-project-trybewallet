import { EMAIL } from '../actions';

const initialState = {
  email: '',
  isLoggedIn: false,
};
export default function user(state = initialState, action) {
  switch (action.type) {
  case EMAIL:
    return { ...state, email: action.payload, isLoggedIn: true };
  default:
    return state;
  }
}
