// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = { email: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'EMAIL_ADD':
    return { ...state, email: action.payload };
  default:
    return state;
  }
};
