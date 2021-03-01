const INITIAL_STATE = {
  user: {
    email: '',
  },
};

const userRedux = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'USER':
    return { ...state, email: action.value };
  default:
    return state;
  }
};

export default userRedux;
