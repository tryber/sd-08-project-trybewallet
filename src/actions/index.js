// Coloque aqui suas actions
export const HANDLE_INPUT = 'HANDLE_INPUT';
export const LOGIN_IN = 'LOGIN_IN';

export const handleInput = (position, input) => ({
  type: HANDLE_INPUT,
  [position]: input,
});

export const handleLogin = (userEmail) => ({
  type: LOGIN_IN,
  user: { email: userEmail },
});
