const INITIAL_STATE = {
  email: '',
};

const userLogin = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN_SUCCESSFUL':
    return {
      ...state,
      email: action.payload.email,
    };
  default:
    return state;
  }
};

export default userLogin;
