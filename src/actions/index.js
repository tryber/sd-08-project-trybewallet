import getWalletAPI from '../services/API';

export const user = (value) => ({
  type: 'LOGIN',
  payload: {
    value,
  },
});

export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
export const REQUEST_API_ERROR = 'REQUEST_API_ERROR';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDITING_EXPENSE = 'EDITING_EXPENSE';
export const EDITED_EXPENSE = 'EDITED_EXPENSE';
export const SAVE_EDITED_EXPENSE = 'SAVE_EDITED_EXPENSE';

export const requestWalletAPI = () => ({
  type: REQUEST_API,
  payload: {
    isFetching: true,
    isEditing: false,
  },
});

export const requestWalletAPISuccess = (data) => ({
  type: REQUEST_API_SUCCESS,
  payload: {
    data,
    isFetching: false,
  },
});

export const requestWalletAPIError = (error) => ({
  type: REQUEST_API_ERROR,
  payload: {
    error,
    isFetching: false,
  },
});

export const fetchWalletAPI = () => async (dispatch) => {
  dispatch(requestWalletAPI());

  try {
    const data = await getWalletAPI();
    dispatch(requestWalletAPISuccess(data));
  } catch (error) {
    dispatch(requestWalletAPIError(error));
  }
};

export const saveExpense = (expenses) => ({
  type: SAVE_EXPENSE,
  payload: {
    expenses,
  },
});

export const deleteExpense = (expenses) => ({
  type: DELETE_EXPENSE,
  payload: {
    expenses,
  },
});

export const editingExpense = (expenses) => ({
  type: EDITING_EXPENSE,
  payload: {
    expenses,
    selectEdited: true,
    isEditing: true,
  },
});

export const editedExpense = (expenses) => ({
  type: EDITED_EXPENSE,
  payload: {
    expenses,
    selectEdited: false,
    isEditing: true,
  },
});

export const saveEditedExpense = (expenses) => ({
  type: SAVE_EDITED_EXPENSE,
  payload: {
    expenses,
    selectEdited: false,
    isEditing: false,
  },
});

export default { user, fetchWalletAPI };
