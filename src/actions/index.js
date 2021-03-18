// Coloque aqui suas actions
export const DISPATCH_EMAIL = 'DISPATCH_EMAIL';

export const dispatchEmail = (userEmail) => ({
  type: DISPATCH_EMAIL,
  userEmail,
});
