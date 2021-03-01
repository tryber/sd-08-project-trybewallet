import { INPUT_HANDLE, LOGIN_USER } from '../actions/index';

const initialState = {
  user: { email: '' },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case INPUT_HANDLE:
    return { ...state, [Object.keys(action)[1]]: Object.values(action)[1] };
  case LOGIN_USER:
    return { ...state, user: { logged: true, email: action.email } };
  default:
    return state;
  }
}
