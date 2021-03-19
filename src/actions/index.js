import getCurrenciesValues from '../services/currenciesValuesApi';

// Actions Data Login User
export const SAVE_EMAIL_USER = 'SAVE_EMAIL_USER';
export const saveEmailUserAction = (email) => ({ type: SAVE_EMAIL_USER, payload: email });

// Actions Requester Api
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

export const fetchCurrenciesValuesAction = () => async (dispatch) => {
  dispatch(requestCurrenciesValues());
  try {
    const currenciesValues = await getCurrenciesValues();
    dispatch(requestCurrenciesValuesSuccess(Object.keys(currenciesValues)));
  } catch (error) {
    dispatch(requestCurrenciesValuesError(error));
  }
};

// Actions Expenses User
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

export const addExpenseAction = (expense) => (
  { type: ADD_EXPENSE, payload: expense }
);

export const addExpenseWithCurrenciesAction = (expense) => async (dispatch) => {
  const currenciesValues = await getCurrenciesValues();
  const newExpense = { ...expense, exchangeRates: currenciesValues };
  dispatch(addExpenseAction(newExpense));
};

export const updateExpenseAction = (expense) => (
  { type: UPDATE_EXPENSE, payload: expense }
);

export const deleteExpenseAction = (id) => (
  { type: DELETE_EXPENSE, payload: id }
);

export const editExpenseAction = (id) => (
  { type: EDIT_EXPENSE, payload: id }
);
