import LOGIN_USER from './ActionTypes';

export const loginUser = (email) => ({ type: LOGIN_USER, payload: { email } });

export default loginUser;
