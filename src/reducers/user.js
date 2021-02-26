// Esse reducer será responsável por tratar as informações da pessoa usuária
import { HANDLE_INPUT, LOGIN_IN } from '../actions/index';

// const adminEmail = 'admin@admin.com';
// const adminPassword = 'admin';

const initialState = {
  user: { email: '' },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case HANDLE_INPUT:
    return { ...state, [Object.keys(action)[1]]: Object.values(action)[1] };
  case LOGIN_IN:
    return { ...state, user: { email: action.user.email } };
  default:
    return state;
  }
}
