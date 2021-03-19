export const SAVE_EMAIL = 'SAVE_EMAIL';
export const INIT = 'INIT';
export const FETCH_OK = 'FETCH_OK';
export const FETCH_FAIL = 'FETCH_FAIL';
export const SAVE_ENTRY = 'SAVE_ENTRY';
export const DELETE_ENTRY = 'DELETE_ENTRY';
export const EDIT_ENTRY_START = 'EDIT_ENTRY_START';
export const EDIT_ENTRY_END = 'EDIT_ENTRY_END';

export const saveEmail = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});

const URL = 'https://economia.awesomeapi.com.br/json/all';

export const getCurrencies = () => (
  fetch(URL)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

const requestCurrencies = () => ({
  type: INIT,
});

const requestOk = (currencies) => ({
  type: FETCH_OK,
  currencies,
});

const requestFail = (error) => ({
  type: FETCH_FAIL,
  error,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    dispatch(requestCurrencies());

    const currencies = await getCurrencies();

    dispatch(requestOk(currencies));
  } catch (error) {
    dispatch(requestFail(error));
  }
};

export const saveExpense = (expenses) => ({
  type: SAVE_ENTRY,
  expenses,
});

export const deleteExpense = (expense) => ({
  type: DELETE_ENTRY,
  expense,
});

export const editExpense = (expense) => ({
  type: EDIT_ENTRY_START,
  expense,
});

export const endExpenseEdit = (expense) => ({
  type: EDIT_ENTRY_END,
  expense,
});
