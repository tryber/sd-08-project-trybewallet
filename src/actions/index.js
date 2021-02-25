import { SAVE_EMAIL } from './types';

const saveEmail = (value) => ({
  type: SAVE_EMAIL,
  value,
});

export default saveEmail;
