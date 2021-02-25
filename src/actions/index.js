// Coloque aqui suas actions
export const LOGGIN = 'LOGGIN';
export const WALLET = 'WALLET';

export const logginAction = (email) => ({
  type: LOGGIN,
  email,
});
