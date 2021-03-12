export const SEND_EMAIL = 'SEND_EMAIL';

const dispatchEmail = (email) => ({
  type: SEND_EMAIL,
  email,
});

export default dispatchEmail;
