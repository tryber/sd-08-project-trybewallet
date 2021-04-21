// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER_LOGIN } from '../common/ActionTypes';

const initialState = {
  email: 'rod.vgo@gmail.com',
};

export default function user(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
  case USER_LOGIN:
    return {
      ...state,
      email: payload,
    };

  default:
    return state;
  }
}
