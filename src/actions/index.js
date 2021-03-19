export const USER_LOGIN = 'USER_LOGIN';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';

export function userLoginAction(email) {
  return {
    type: USER_LOGIN,
    email,
  };
}
