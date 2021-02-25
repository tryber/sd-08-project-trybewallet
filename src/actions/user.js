import { STORE_EMAIL } from './constants';

export default function storeEmail(email) {
  return {
    type: STORE_EMAIL,
    payload: email,
  };
}
