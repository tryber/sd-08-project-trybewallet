import { LOGIN } from './types';

function loginAction(email) {
  return {
    type: LOGIN,
    payload: email,
  };
}

export default loginAction;
