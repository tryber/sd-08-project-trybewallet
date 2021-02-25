import { LOGIN } from '../actions';

const initialState = {
  email: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: { ...state.email, email: action.email },
    };
  default:
    return state;
  }
};

export default user;
