// Coloque aqui suas actions
import fetchCurrency from '../API';

export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const UPDATE_CURRENCIES = 'UPDATE_CURRENCIES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';

export const addEmail = (event) => ({
  type: 'EMAIL',
  value: event,
});

const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

const updateCurrency = (exchangeRates) => ({
  type: UPDATE_CURRENCIES,
  exchangeRates,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const editExpenses = (expenses) => ({
  type: EDIT_EXPENSES,
  expenses,
});

export const THIS_EDITING = 'THIS_EDITING';

export const thisEditing = (change) => ({
  type: THIS_EDITING,
  change,
});

export const ADD_EDICAO = 'ADD_EDICAO';

export const addEdicao = (expense) => ({
  type: ADD_EDICAO,
  expense,
});

export function fetchCurrencyAction(expense) {
  return (dispatch) => fetchCurrency()
    .then(
      (exchangeRates) => dispatch(updateCurrency(exchangeRates)),
    )
    .then(
      () => dispatch(addExpense(expense)),
    );
}
