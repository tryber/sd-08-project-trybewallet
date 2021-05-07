import { ADD_USER } from './index';

const addUser = (email) => ({
  type: ADD_USER,
  payload: email,
});

export default addUser;
