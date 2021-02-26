import { GET_EMAIL } from '../actions';

const initialState = {
  email: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_EMAIL:
    return ({
      ...state,
      email: action.value,
    });
  default:
    return state;
  }
};

export default userReducer;
