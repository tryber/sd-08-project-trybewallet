const INITIAL_STATE = {
  email: '',
  password: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, email: action.email };
  default:
    return state;
  }
}

export default user;
