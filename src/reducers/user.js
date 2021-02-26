// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  email: '',
  password: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, email: action.email, password: action.password };
  default:
    return state;
  }
};

export default user;
