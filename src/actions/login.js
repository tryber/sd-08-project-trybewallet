import { SAVE_EMAIL } from './types';

export default function saveEmail(email) {
  return {
    type: SAVE_EMAIL,
    payload: email,
  };
}
