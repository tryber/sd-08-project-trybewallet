// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL = {
  email: 'alguem@email.com',
  password: '123456',
};

const reducer = (state = INITIAL, action) => {
  switch (action.type) {
  case 'SET_USER':
    return {
      ...state,
      email: action.email,
      password: action.password,
    };
  default:
    return state;
  }
};

export default reducer;
