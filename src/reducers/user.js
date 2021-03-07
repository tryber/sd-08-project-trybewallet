import { LOGIN } from '../actions/user.action';

const initialState = {
  email: '',
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.value };
  default:
    return state;
  }
}

export default loginReducer;
