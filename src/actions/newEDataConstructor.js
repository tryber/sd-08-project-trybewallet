import types from './types';

export const sendNewExpenseData = () => (
  {
    type: types.SEND_NEW_EXPENSE_DATA,
  }
);

export const sendNewExpenseDataSucceed = (expenses) => (
  {
    type: types.SEND_NEW_EXPENSE_DATA_SUCCEED,
    expenses,
  }
);

export const sendNewExpenseDataFailed = (error) => (
  {
    type: types.SEND_NEW_EXPENSE_DATA_FAILED,
    error,
  }
);

export default function newEDataConstructor(expenses, newExpense) {
  return async (dispatch) => {
    try {
      dispatch(sendNewExpenseData());
      const URL = 'https://economia.awesomeapi.com.br/json/all';
      const exchangeRates = await fetch(URL)
        .then((response) => response.json());
      newExpense.exchangeRates = exchangeRates;
      expenses.concat(newExpense);
      return dispatch(sendNewExpenseDataSucceed(expenses));
    } catch (error) {
      return dispatch(sendNewExpenseDataFailed(error));
    }
  };
}
