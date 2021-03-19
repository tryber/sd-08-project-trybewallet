// Esse reducer será responsável por tratar as informações da pessoa usuária
import { Types } from '../actions/user';

const INITIAL_STATE = {
  email: '',
};

const saveEmail = (state = INITIAL_STATE, action) => ({
  ...state, email: action.email,
});

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case Types.SAVE_EMAIL: return saveEmail(state, action);
  default: return state;
  }
}
