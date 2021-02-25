// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
  password: '',
  validUser: false,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'VERIFY_EMAIL':
    return { ...state, email: action.payload.email, validUser: action.payload.validUser };
  case 'VERIFY_PASSWORD':
    return {
      ...state,
      password: action.payload.password,
      validUser: action.payload.validUser,
    };
  default:
    return state;
  }
};

export default user;
