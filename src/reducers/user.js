const initialState = {
  email: '',
};

function userLogin(state = initialState, { type, payload }) {
  switch (type) {
  case 'LOGIN':
    return {
      ...state,
      email: payload.value.email,
    };
  default:
    return state;
  }
}

export default userLogin;
