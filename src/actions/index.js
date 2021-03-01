export const INPUT_HANDLE = 'INPUT_HANDLE';
export const LOGIN_USER = 'LOGIN_USER';

export const inputHandle = (position, input) => ({
  type: INPUT_HANDLE,
  [position]: input,
});

export const handleLogin = (userEmail) => ({
  type: LOGIN_USER,
  user: { email: userEmail },
});
