export const SAVE_EMAIL = 'SAVE_EMAIL';
const saveEmail = (email) => console.log(email) || ({
  type: SAVE_EMAIL,
  payload: {
    email,
  },
});

export default saveEmail;
