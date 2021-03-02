export const TYPES = {
  SAVE_EMAIL: 'SAVE_EMAIL',
};

export const saveEmail = (email) => ({
  type: TYPES.SAVE_EMAIL,
  payload: email,
});
