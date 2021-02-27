import { STORE_EMAIL } from '../actions/constants';

const initialState = {
  email: 'scarige@gmail.com',
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
  case STORE_EMAIL:
    return {
      email: action.payload,
    };
  default:
    return state;
  }
}
