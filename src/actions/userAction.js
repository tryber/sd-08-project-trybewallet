import { USER } from '.';

export default function userAction(email) {
  return {
    type: USER,
    email,
  };
}
