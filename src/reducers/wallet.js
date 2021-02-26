import * as ActionTypes from '../common/ActionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function reducer(state = INITIAL_STATE, action = null) {
  const { type, payload } = action;
  switch (type) {
  case ActionTypes.USER_LOGIN:
    return {
      ...state,
      isAuth: true,
      token: payload.token,
      access: payload.access,
    };
  case ActionTypes.USER_LOGOUT:
    return { ...state, isAuth: false, token: null, access: null };
  case 'UPDATE_VALUE':
    return { ...state, value: payload };

  default:
    return state;
  }
}
