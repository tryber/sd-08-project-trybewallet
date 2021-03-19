import { USER } from './index';

const actionUser = (email, password) => ({
  type: USER,
  payload: {
    email,
    password,
  },
});

export default actionUser;
