// Esse reducer será responsável por tratar as informações da pessoa usuária
import { Types } from '../actions/user';

const INITIAL_STATE = {
  email: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case Types.SAVE_EMAIL: return { ...state, email: action.email };
  default: return state;
  }
}
