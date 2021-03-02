import { LOGIN_USER, ADD_WALLET } from './ActionTypes';

export const loginUser = (email) => ({ type: LOGIN_USER, payload: { email } });

export const addWallet = (currencies, expenses) => ({
  type: ADD_WALLET, paypload: { currencies, expenses } });
