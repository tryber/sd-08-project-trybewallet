import TYPES from './types';

const getCurrencies = (payload) => ({
  type: TYPES.GET_CURRENCIES,
  payload,
});

const isFetching = () => ({
  type: TYPES.FECTHING_API,
});

const errorFetching = (error) => ({
  type: TYPES.ERROR_FETCHING_API,
  payload: error,
});

const saveExpense = (expense) => ({
  type: TYPES.NEW_EXPENSE,
  payload: expense,
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(isFetching());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(getCurrencies(data));
  } catch (error) {
    dispatch(errorFetching(error));
  }
};

export const addNewCurrencie = (expense) => async (dispatch) => {
  dispatch(isFetching);
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const expenseWithCurrentCurrencies = { ...expense, exchangeRates: data };
    dispatch(saveExpense(expenseWithCurrentCurrencies));
  } catch (error) {
    dispatch(errorFetching(error));
  }
};
