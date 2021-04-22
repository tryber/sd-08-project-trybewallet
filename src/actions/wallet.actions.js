import {
  REQUEST_CURRENCY,
  IS_FETCHING,
  ADD_EXPENSE,
} from '../common/ActionTypes';
import fetchApi from '../services/Api';

export function requestCurrency(payload) {
  return {
    // a: console.log(payload),
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

// export function fetchFullCurrency() {
//   return async (dispatch) => {
//     const requestCur = await fetchApi();
//     dispatch(requestFullCurrency(requestCur));
//   };
// }
