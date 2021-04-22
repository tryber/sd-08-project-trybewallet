// action creators
import { USER_EMAIL } from '../common/typesAction';

export default function handleEmail(email) {
  return {
    type: USER_EMAIL,
    payload: {
      email,
    },
  };
}
