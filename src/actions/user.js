import { GET_USER_EMAIL } from './constants';

const getUserEmail = (UserEmail) => ({ type: GET_USER_EMAIL, UserEmail });

export default getUserEmail;
