// Coloque aqui suas actions
import { USER_EMAIL } from '../components/Allconsts';

const addedUser = (value) => ({
  type: USER_EMAIL,
  payload: {
    userEmail: value.email,
    userPassword: value.password,
  },
});

export default addedUser;
