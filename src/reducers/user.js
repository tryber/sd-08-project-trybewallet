// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = { email: '' };
const ADCIONAR_EMAIL = 'ADCIONAR_EMAIL';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADCIONAR_EMAIL:
    return { ...state, email: action.payload };
  default:
    return state;
  }
};
