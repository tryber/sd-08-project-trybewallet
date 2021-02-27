import USER_LOGIN from './index';

export default function userLoginAction(email) {
  return {
    type: USER_LOGIN,
    payload: {
      email,
    },
  };
}
