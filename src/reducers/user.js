// Esse reducer será responsável por tratar as informações da pessoa usuária
import LOGIN from '../actions/types';

const initial = {
  email: '',
};

function user(state = initial, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}

export default user;
