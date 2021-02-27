// Esse reducer será responsável por tratar as informações da pessoa usuária
import { EMAIL, PASS } from '../actions';

const initialState = {
  email: '',
  password: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  // case USER:
  //   return { ...state, email: action.value.email, password: action.value.password };
  case EMAIL:
    return { ...state, email: action.value };
  case PASS:
    return { ...state, password: action.value };
  default:
    return state;
  }
}

export default user;
