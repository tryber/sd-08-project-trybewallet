import { STORE_EMAIL } from './constants';

export default storeEmail = (email) => ({
  type: STORE_EMAIL,
  payload: email,
});
