import { SAVE_USER_EMAIL } from '../components/Allconsts';

const addUserEmail = (email) => ({
  type: SAVE_USER_EMAIL,
  payload: {
    email,
  },
});

export default addUserEmail;
