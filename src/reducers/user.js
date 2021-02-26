// Esse reducer será responsável por tratar as informações da pessoa usuária
import { HANDLE_INPUT, LOGIN_IN } from '../actions/index';

// const adminEmail = 'admin@admin.com';
// const adminPassword = 'admin';

const initialState = {
  email: '',
};

export default function user(state = initialState, action) {
  switch (action.type) {
  case HANDLE_INPUT:
    return { ...state, [Object.keys(action)[1]]: Object.values(action)[1] };
  case LOGIN_IN:
    return { ...state, email: action.user.email };
  default:
    return state;
  }
}
