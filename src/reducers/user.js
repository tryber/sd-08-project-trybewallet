// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  email: '',
};

const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN_SUCCESS:
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default user;
