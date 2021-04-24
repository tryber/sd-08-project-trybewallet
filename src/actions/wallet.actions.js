import {
  REQUEST_CURRENCY,
  IS_FETCHING,
  ADD_EXPENSE,
  DELETE_EXPENSE,
} from '../common/ActionTypes';
import fetchApi from '../services/Api';

export function requestCurrency(payload) {
  return {
    type: REQUEST_CURRENCY,
    payload,
  };
}

export function saveNewExpense(payload) {
  return {
    type: ADD_EXPENSE,
    payload,
  };
}

export function isFetching() {
  return {
    type: IS_FETCHING,
  };
}

export function fetchCurrency() {
  return async (dispatch) => {
    dispatch(isFetching());
    const requestCur = await fetchApi();
    dispatch(requestCurrency(requestCur));
  };
}

export function deleteExpense(payload) {
  return {
    type: DELETE_EXPENSE,
    payload,
  };
}
