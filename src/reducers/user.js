// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = ({
  email: '',
  password: '',
});

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'USER_EMAIL':
    return { ...state, email: action.value.target.value };
  case 'USER_PASSWORD':
    return { ...state, password: action.value.target.value };
  default:
    return state;
  }
};

export default user;
