export const STORE_EMAIL = 'STORE_EMAIL';

export function storeEmail(email) {
  return {
    type: STORE_EMAIL,
    payload: {
      email,
    },
  };
}
