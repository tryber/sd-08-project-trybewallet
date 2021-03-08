import fetchApi from '../thunk/currency';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  value: email,
});

export const saveCurrencies = (value) => (
  {
    type: SAVE_CURRENCIES,
    value,
  }
);

export const saveExpense = (value) => (
  {
    type: SAVE_EXPENSE,
    value,
  }
);

export function fetchApiCurrencies() {
  return async (dispatch) => {
    const data = await fetchApi();
    return dispatch(saveCurrencies(data));
  };
}
