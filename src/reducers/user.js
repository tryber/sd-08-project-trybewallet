const initialState = {
  email: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case 'USER_INFO':
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
