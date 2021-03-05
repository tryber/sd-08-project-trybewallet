import { SAVE_EMAIL } from '../actions/types';

const initialState = {
  email: 'nhonho@gmail.com',
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
  case SAVE_EMAIL:
    return {
      email: action.payload,
    };
  default:
    return state;
  }
}
