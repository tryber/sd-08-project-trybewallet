import * as actions from './index';
import fetchApi from './api';

const { ADD_EXPENSE, REQUEST_CURRENCIES, RECEIVE_CURRENCIES,
  FAILED_REQUEST, START_EDIT, DELETE_EXPENSE, CLOSE_EDIT } = actions;

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

export const walletDeleteExpenseAction = (expense) => ({
  type: DELETE_EXPENSE,
  payload: {
    expense,
  },
});

export const walletEditExpenseAction = (expenseKey) => ({
  type: START_EDIT,
  payload: {
    expenseKey,
  },
});

export const walletCloseEditAction = (expense) => ({
  type: CLOSE_EDIT,
  payload: {
    expense,
  },
});
