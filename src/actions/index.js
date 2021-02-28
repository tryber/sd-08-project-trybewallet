// Coloque aqui suas actions
import * as currencyAPI from '../services/currencyAPI';

export const LOGIN = 'LOGIN';

export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const RECEIVE_CURRENCY_SUCCESS = 'RECEIVE_CURRENCY_SUCCESS';
export const RECEIVE_CURRENCY_FAILURE = 'RECEIVE_CURRENCY_FAILURE';

export const COMPLETE_EXPENSES = 'COMPLETE_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const ATUALIZAR_EXPENSES = 'ATUALIZAR_EXPENSES';

export const login = (email, password) => ({
  type: LOGIN,
  email,
  password,
});

const requestCurrency = () => ({
  type: REQUEST_CURRENCY,
});

const receiveCurrencySuccess = (exchangeRates) => ({
  type: RECEIVE_CURRENCY_SUCCESS,
  exchangeRates,
});

const receiveCurrencyFailure = (error) => ({
  type: RECEIVE_CURRENCY_FAILURE,
  error,
});

export function fetchCurrency() {
  return (dispatch) => {
    dispatch(requestCurrency());
    return currencyAPI.getCurrency()
      .then(
        (exchangeRates) => dispatch(receiveCurrencySuccess(exchangeRates)),
        (error) => dispatch(receiveCurrencyFailure(error)),
      );
  };
}

export const completeExpenses = (fullData) => ({
  type: COMPLETE_EXPENSES,
  fullData,
});

export const UpdateExpenses = (newExpenses, type) => ({
  type,
  newExpenses,
});

export function expensesWithExchangeRates(expensesData) {
  // console.log(expensesData);
  return async (dispatch) => {
    dispatch(requestCurrency());
    try {
      const exchangeRates = await currencyAPI.getCurrencyV4();
      expensesData.exchangeRates = exchangeRates;
      dispatch(completeExpenses(expensesData));
    } catch (error) {
      dispatch(receiveCurrencyFailure(error));
    }
  };
}

export function deleteExpense(idExpense, expenses) {
  // const expensesCopyV2 = expenses.slice();
  // console.log(expensesCopyV2);
  const expensesCopyV1 = [...expenses];
  const newExpenses = expensesCopyV1.filter((expense) => expense.id !== idExpense);
  // console.log(newExpenses);
  //   return {
  //     type: DELETE_EXPENSES,
  //     newExpenses,
  //   };
  return (dispatch) => {
    dispatch(UpdateExpenses(newExpenses, DELETE_EXPENSES));
  };
}

export function editExpense(expense) {
  const editExp = expense;
  console.log(editExp);

  return {
    type: EDIT_EXPENSES,
    editExp,
  };
}

export function updateExpense(expense, expenses) {
  const expensesCopy = expenses.slice();
  const expenseIndex = expenses.findIndex((exp) => exp.id === expense.id);
  expensesCopy[expenseIndex] = expense;
  return {
    type: ATUALIZAR_EXPENSES,
    expensesCopy,
  };
}
