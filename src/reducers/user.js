import { UPDATE_EMAIL } from '../consts';

const initialState = {
  email: '',
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
  case UPDATE_EMAIL:
    return { ...state, ...payload };
  default:
    return state;
  }
};

export default user;
