import { USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return ({
      ...state,
      email: action.value,
    });
  default:
    return state;
  }
};

export default walletReducer;
