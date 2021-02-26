// Esse reducer será responsável por tratar as informações da pessoa usuária
import ADD_LOGIN from '../const';

const INITIAL_STATE = {
  email: '',
  password: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_LOGIN:
    return { ...state, ...action.data };
  default:
    return state;
  }
}

export default user;
