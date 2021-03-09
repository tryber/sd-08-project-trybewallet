export const SAVE_EMAIL = 'SAVE_EMAIL';
const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: {
    email,
  },
});

export default saveEmail;
