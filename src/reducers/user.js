const INITIAL_STATE = {};
const USER_LOGIN = 'USER_LOGIN';
function userReducerLogin(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_LOGIN:
    return { ...state, email: action.payload };
  default:
    return state;
  }
}

export default userReducerLogin;
