import getAPIData from '../services/fetchAPI';

// Coloque aqui suas actions
const LOGIN = 'LOGIN';
const ADD_EXPENSE = 'ADD_EXPENSE';
const DEL_EXPENSE = 'DEL_EXPENSE';
const EDIT_EXPENSE = 'EDIT_EXPENSE';
const REQUEST_API = 'REQUEST_API';
const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
const REQUEST_API_FAIL = 'REQUEST_API_FAIL';

const login = (email) => ({
  type: LOGIN,
  payload: { email },
});

const addExpense = (item) => ({
  type: ADD_EXPENSE,
  payload: item,
});

const delExpense = (item) => ({
  type: DEL_EXPENSE,
  payload: item,
});

const editExpense = (item) => ({
  type: EDIT_EXPENSE,
  payload: {
    item,
    isEditing: true,
  },
});

const requestAPI = () => ({
  type: REQUEST_API,
  payload: {
    isFatching: true,
  },
});

const requestAPISuccess = (response) => ({
  type: REQUEST_API_SUCCESS,
  payload: {
    currencies: [...response],
    ifFatching: false,
  },
});

const requestAPIFail = (error) => ({
  type: REQUEST_API_FAIL,
  payload: { error },
  isFatching: false,
});

const fetchAPI = () => async (dispatch) => {
  dispatch(requestAPI());
  try {
    const data = await getAPIData();
    const dataKeys = Object.keys(await data);
    const currencies = dataKeys
      .map((key) => ({
        currency: key,
        currencyDetails: data[key],
      })).filter((item) => item.currency !== 'USDT');
    dispatch(requestAPISuccess(currencies));
  } catch (error) {
    dispatch(requestAPIFail(error));
  }
};

export {
  LOGIN,
  login,
  ADD_EXPENSE,
  addExpense,
  DEL_EXPENSE,
  delExpense,
  EDIT_EXPENSE,
  editExpense,
  REQUEST_API,
  requestAPI,
  REQUEST_API_SUCCESS,
  requestAPISuccess,
  REQUEST_API_FAIL,
  requestAPIFail,
  fetchAPI,
};
