import { fetchApiWallet } from '../actionCreator/fetchApi.js';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_WALLET = 'USER_WALLET';
export function userLogin(email) {
  return (
    { type: USER_LOGIN,
      payload: email,
    }
  );
}

function userWalletAll(payload, exchangeRates) {
  return (
    { type: USER_WALLET,
      payload: { ...payload, exchangeRates },
    }
  );
}

export function userWallet(payload) {
  return (dispatch) => fetchApiWallet()
    .then((data) => dispatch(userWalletAll(payload, data)));
}
