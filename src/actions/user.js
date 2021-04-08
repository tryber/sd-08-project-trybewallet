import { USER } from './index';

const actionUser = (email) => ({ type: USER, email });
export default actionUser;
// export const actionToken = (token) => ({ type: TOKEN, payload: { token } });
