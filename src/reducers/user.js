// Esse reducer será responsável por tratar as informações da pessoa usuária
const DEFAULT_STATE = { email: '' };
const user = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case 'SET_EMAIL':
    return {
      ...state, email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
