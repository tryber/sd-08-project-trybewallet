import TYPES from './types';

const saveEmail = (email) => ({
  type: TYPES.SAVE_EMAIL,
  payload: email,
});

export default saveEmail;
