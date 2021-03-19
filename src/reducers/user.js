const INITIAL_STATE = {
  email: '',
  logged: false,

};
function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN': {
    return { email: action.email, logged: true };
  }

  default:
    return state;
  }
}

export default userReducer;
