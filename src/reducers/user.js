// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADCIONAR_EMAIL } from '../actions';

const INITIAL_STATE = { email: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADCIONAR_EMAIL:
    return { ...state, email: action.value };
  default:
    return state;
  }
};
