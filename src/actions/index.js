export const Types = {
  SAVE_EMAIL: 'SAVE_EMAIL',
};

export const Creators = {
  saveEmail: (email) => ({
    type: Types.SAVE_EMAIL,
    payload: email,
  }),
};
