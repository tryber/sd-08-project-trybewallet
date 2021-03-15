import { ENTER_LOGIN } from '../actions';

const initialState = {
  email: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case ENTER_LOGIN:
    console.log(action.value)
    return {
      email: action.value,
    };
  default:
    return state;
  }
}

export default user;
