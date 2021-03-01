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

export const requestWalletAPI = () => ({
  type: REQUEST_API,
  payload: {
    isFetching: true,
  },
});

export const requestWalletAPISuccess = (data) => ({
  type: REQUEST_API_SUCCESS,
  payload: {
    data,
    isFetching: true,
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

export default { user, fetchWalletAPI };
