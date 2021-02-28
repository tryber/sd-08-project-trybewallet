export const USER_LOGIN = 'USER_LOGIN';
export const WALLET = 'WALLET';

export const actionLogin = (value) => ({
  type: USER_LOGIN,
  value,
});

export const walletPayments = (value) => ({
  type: WALLET,
  value,
});
