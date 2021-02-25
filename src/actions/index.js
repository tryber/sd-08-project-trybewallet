export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const user = {
  login: (payload) => ({ type: LOGIN, payload }),
  logout: () => ({ type: LOGOUT }),
};

export const Wallet = {};
