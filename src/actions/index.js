import getCurrenciesValues from '../services/currenciesValuesApi';

export const SAVE_EMAIL_USER = 'SAVE_EMAIL_USER';
export const actionEmail = (email) => ({ type: SAVE_EMAIL_USER, payload: email });

export const REQUEST_CURRENCIES_VALUES = 'REQUEST_CURRENCIES_VALUES';
export const REQUEST_CURRENCIES_VALUES_SUCCESS = 'REQUEST_CURRENCIES_VALUES_SUCCESS';
export const REQUEST_CURRENCIES_VALUES_ERROR = 'REQUEST_CURRENCIES_VALUES_ERROR';
const requestCurrenciesValues = () => ({
  type: REQUEST_CURRENCIES_VALUES,
  payload: {
    isFetching: true,
  },
});

const requestCurrenciesValuesSuccess = (currencies) => ({
  type: REQUEST_CURRENCIES_VALUES_SUCCESS,
  payload: {
    currencies, isFetching: false,
  },
});

const requestCurrenciesValuesError = (error) => ({
  type: REQUEST_CURRENCIES_VALUES_ERROR,
  payload: {
    error, isFetching: false,
  },
});

export const fetchCurrenciesValues = () => async (dispatch) => {
  dispatch(requestCurrenciesValues());
  try {
    const currenciesValues = await getCurrenciesValues();
    dispatch(requestCurrenciesValuesSuccess(currenciesValues));
  } catch (error) {
    dispatch(requestCurrenciesValuesError(error));
  }
};

export const SAVE_EXPENSE_USER = 'SAVE_EXPENSE_USER';
export const DELETE_EXPENSE_USER = 'DELETE_DELETE_EXPENSE';
export const EDITAR_EXPENSE_USER = 'EDITAR_EXPENSE_USER';

export const saveExpenseUser = (expense) => (
  { type: SAVE_EXPENSE_USER, payload: expense }
);

export const deleteExpenseUser = (id) => (
  { type: DELETE_EXPENSE_USER, payload: id }
);

export const editarExpenseUser = (id) => (
  { type: EDITAR_EXPENSE_USER, payload: id }
);
