import {
  REQ_CURRENCIE,
  GET_CURRENCIE,
  EXPENSES_FORM,
  ADD_EXPENSES,
  DELETE_EXPENSES,
  EDIT,
  FINISH_EDIT,
} from './types';

const requestCurrencie = () => ({
  type: REQ_CURRENCIE,
});

const getCurrencie = (payload) => ({
  type: GET_CURRENCIE,
  payload,
});

export function fetchCurrencie() {
  return (dispatch) => {
    dispatch(requestCurrencie());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencie) => {
        delete currencie.USDT;
        return currencie;
      })
      .then((currencie) => dispatch(getCurrencie(currencie)));
  };
}

export const expensesForm = (key, input) => ({
  type: EXPENSES_FORM,
  payload: {
    key,
    input,
  },
});

export const addExpenses = () => ({
  type: ADD_EXPENSES,
});

export const deleteExpenses = (payload) => ({
  type: DELETE_EXPENSES,
  payload,
});

export const edit = (payload) => ({
  type: EDIT,
  payload,
});

export const finishEdit = () => ({
  type: FINISH_EDIT,
});

export default fetchCurrencie;
