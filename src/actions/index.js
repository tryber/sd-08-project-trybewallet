import getCurrencyTypes from '../services/api';

export const HANDLE_USER_LOGIN = 'HANDLE_USER_LOGIN';

export const REQUEST_CURRENCY_TYPE = 'REQUEST_CURRENCY_TYPE';
export const REQUEST_CURRENCY_TYPE_SUCCESS = 'REQUEST_CURRENCY_TYPE_SUCCESS';
export const REQUEST_CURRENCY_TYPE_ERROR = 'REQUEST_CURRENCY_TYPE_ERROR';

export const HANDLE_ADD_EXPENSE = 'HANDLE_ADD_EXPENSE';
export const HANDLE_DELETE_EXPENSE = 'HANDLE_DELETE_EXPENSE';
export const HANDLE_EDIT_EXPENSE = 'HANDLE_EDIT_EXPENSE';
export const HANDLE_SUBMIT_EXPENSE = 'HANDLE_SUBMIT_EXPENSE';

export const handleUserLogin = (email) => ({
  type: HANDLE_USER_LOGIN,
  email,
});

export const requestCurrencyType = () => ({
  type: REQUEST_CURRENCY_TYPE,
  payload: {
    isFetching: true,
  },
});

export const requestCurrencyTypeSuccess = (types) => ({
  type: REQUEST_CURRENCY_TYPE_SUCCESS,
  payload: { types, isFetching: false },
});

export const requestCurrencyTypeError = (error) => ({
  type: REQUEST_CURRENCY_TYPE_ERROR,
  payload: { error, isFetching: false },
});

export const fetchCurrencyType = () => async (dispatch) => {
  dispatch(requestCurrencyType());

  try {
    dispatch(
      requestCurrencyTypeSuccess(await getCurrencyTypes()),
    );
  } catch (error) {
    dispatch(
      requestCurrencyTypeError(error),
    );
  }
};

export const handleAddExpense = (expense) => ({
  type: HANDLE_ADD_EXPENSE,
  payload: expense,
});

export const handleDeleteExpense = (expense) => ({
  type: HANDLE_DELETE_EXPENSE,
  payload: expense,
});

export const handleEditExpense = (expense) => ({
  type: HANDLE_EDIT_EXPENSE,
  payload: expense,
});

export const handleSubmitExpense = (expense) => ({
  type: HANDLE_SUBMIT_EXPENSE,
  payload: expense,
});
