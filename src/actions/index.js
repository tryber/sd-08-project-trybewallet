export const EMAIL = 'EMAIL';

export const emailChange = (payload) => ({
  type: EMAIL,
  payload,
});

export const CURRENCIES = 'CURRENCIES';

export const currenciesSave = (payload) => ({
  type: CURRENCIES,
  payload,
});

export const EXPANSES = 'EXPANSES';

export const expanseSave = (payload) => ({
  type: EXPANSES,
  payload,
});

export const DELETE_EXPANSE = 'DELETE_EXPANSE';

export const expanseDelete = (payload) => ({
  type: DELETE_EXPANSE,
  payload,
});
