import LOGIN from './types';

export default function loginAction(email) {
  return {
    type: LOGIN,
    payload: email,
  };
}
