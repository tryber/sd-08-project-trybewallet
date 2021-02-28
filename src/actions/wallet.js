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

export default function fetchCurrencie() {
  return async (dispatch) => {
    dispatch(requestCurrencie());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencie = await response.json();
    delete currencie.USDT;
    const currencie1 = (currencie);
    return dispatch(getCurrencie(currencie1));
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
