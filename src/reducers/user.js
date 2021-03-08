const LOGIN = 'LOGIN';

const INIT_STATE = {
  email: '',
};

function userReducer(state = INIT_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.email };
  default:
    return state;
  }
}

export default userReducer;
