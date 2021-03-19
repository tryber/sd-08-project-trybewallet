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

export const EDIT_EXPANSE_START = 'EDIT_EXPANSE_START';

export const expanseEdit = (payload) => ({
  type: EDIT_EXPANSE_START,
  payload,
});

export const EDIT_EXPANSE_END = 'EDIT_EXPANSE_END';

export const expanseEditEnd = (payload) => ({
  type: EDIT_EXPANSE_END,
  payload,
});
