// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'VERIFY_LOGIN':
    return { ...state, email: action.payload.email };
  default:
    return state;
  }
};

export default user;
