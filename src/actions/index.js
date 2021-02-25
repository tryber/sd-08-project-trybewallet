// Coloque aqui suas actions
export const EMAIL = 'EMAIL';
export const WALLET = 'WALLET';

export const emailChange = (payload) => ({
  type: EMAIL,
  payload,
});

export const walletChange = (payload) => ({
  type: WALLET,
  payload,
});
