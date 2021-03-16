import * as actions from './index';
import fetchApi from './api';

const { ADD_EXPENSE, REQUEST_CURRENCIES, RECEIVE_CURRENCIES, FAILED_REQUEST } = actions;

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
  payload: {
    isLoading: true,
  },
});

export const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  payload: { currencies, isLoading: false },
});

export const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  payload: { error, isLoading: false },
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  try {
    const response = await fetchApi();
    dispatch(
      receiveCurrencies(response),
    );
  } catch (error) {
    dispatch(
      failedRequest(error),
    );
  }
};

export const walletAddExpenseAction = (expenses) => ({
  type: ADD_EXPENSE,
  payload: {
    expenses,
  },
});
// fetchApi().then((response) => dispatch(receiveCurrencies(response)))
//     .catch((error) => dispatch(failedRequest(error)));

// export const fetchISSLocation = () => async (dispatch) => {
//   dispatch(requestISSLocation());

//   try {
//     const issLocationResponse = await getCurrentISSLocation();
//     dispatch(
//       requestISSLocationSuccess(issLocationResponse),
//     );
//   } catch (error) {
//     dispatch(
//       requestISSLocationError(issLocationError),
//     );
//   }
