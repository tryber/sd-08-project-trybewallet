import { LOGIN } from '../actions';

const initialState = {
  email: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state, email: action.payload,
    };
  default:
    return state;
  }
}
