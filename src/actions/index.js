export const HANDLE_USER_LOGIN = 'HANDLE_USER_LOGIN';

export const handleUserLoginAction = (email) => ({
  type: HANDLE_USER_LOGIN,
  email,
});
