// Coloque aqui suas actions

export const userEmail = (email, validUser) => (
  { type: 'VERIFY_EMAIL', payload: { email, validUser } }
);
export const userPassword = (password, validUser) => (
  { type: 'VERIFY_PASSWORD', payload: { password, validUser } }
);
export const walletInsert = {};
