import { SAVE_EMAIL } from '../actions/types';
// Esse reducer será responsável por tratar as informações da pessoa usuária
const initialState = {
  email: '',
};

const userReducer = (state = initialState, { type, value }) => {
  switch (type) {
  case SAVE_EMAIL:
    return ({
      ...state,
      email: value,
    });
  default: return initialState;
  }
};

export default userReducer;
