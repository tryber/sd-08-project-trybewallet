export const SAVES_USER_EMAIL = 'SAVES_USER_EMAIL';

export const savesUserEmail = (email) => {
  return ({
    type: SAVES_USER_EMAIL,
    payload: email,
  });
}
