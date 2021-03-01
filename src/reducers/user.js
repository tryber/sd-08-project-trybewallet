import { STORE_EMAIL } from '../actions';

const INITIAL_STATE = { email: 'teste@email.com' }; // REMOVER esse email

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case STORE_EMAIL:
    return { ...state, email: action.payload.email };
  default:
    return state;
  }
}

export default user;
