// Esse reducer será responsável por tratar as informações da pessoa usuária
const USER = ({
  email: '',
  password: '',
});

const userReducer = (state = USER, action) => {
  switch (action.type) {
  case 'LOGIN_EMAIL':
    return { ...state, email: action.value.target.value };
  case 'LOGIN_PASSWORD':
    return { ...state, password: action.value.target.value };
  default:
    return state;
  }
};

export default userReducer;
