import types from './types';

function loginAction(email) {
  return {
    type: types.LOGIN,
    payload: email,
  };
}

export default loginAction;
