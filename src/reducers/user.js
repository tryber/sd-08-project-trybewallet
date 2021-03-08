import types from '../actions/types';

const LOGIN_INITIAL_VALUE = {
  email: '',
};

const user = (state = LOGIN_INITIAL_VALUE, action) => {
  switch (action.type) {
  case types.SAVE_LOGIN:
    return ({
      ...state,
      email: action.email,
    });
  default:
    return state;
  }
};

export default user;
