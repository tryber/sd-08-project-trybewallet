const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      user: { email: action.email },
    };
  default:
    return state;
  }
}

export default userReducer;
