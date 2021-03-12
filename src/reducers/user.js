import { EMAIL } from '../actions';

const initialState = {
  email: '',
};
export default function user(state = initialState, action) {
  switch (action.type) {
  case EMAIL:
    return { ...state, email: action.payload };
  default:
    return state;
  }
}
