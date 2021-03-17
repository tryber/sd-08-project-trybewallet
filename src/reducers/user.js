// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
  password: '',
  validUser: false,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_USER':
    return {
      ...state,
      email: action.payload.email,
      password: action.payload.password,
      validUser: true,
    };
  default:
    return state;
  }
};

export default user;
