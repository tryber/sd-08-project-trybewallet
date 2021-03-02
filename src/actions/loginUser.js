import { LOGIN_USER } from './index';

export default function loginUserAction(email) {
  return {
    type: LOGIN_USER,
    payload: {
      email,
    },
  };
}
