// Esse reducer será responsável por tratar as informações da pessoa usuária;
import types from '../actions/types';

const initial = {
  email: '',
};

export default (state = initial, action) => {
  switch (action.type) {
  case types.LOGIN:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};
