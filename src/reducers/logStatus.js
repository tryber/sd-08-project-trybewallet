import { IS_LOGGED } from '../actions/index';

const INITIAL_STATE = {
  isLogged: false,
};

export default function isLoggedReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case IS_LOGGED:
    return {
      ...state,
      isLogged: action.payload.isLogged,
    };
  default:
    return state;
  }
}
