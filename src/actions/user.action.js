// Coloque aqui suas actions
import { USER_LOGIN } from '../common/ActionTypes';

export default function userEmail(payload) {
  return {
    type: USER_LOGIN,
    payload,
  };
}
