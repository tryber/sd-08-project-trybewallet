import currenciesApi from '../services';

export const GET_EMAIL = 'GET_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SAVE_EXPENDITURE = 'SAVE_EXPENDITURE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_CHANGE = 'EDIT_CHANGE';
export const SET_EDIT_EXPENDITURE = 'SET_EDIT_EXPENDITURE';

export function loginAction({ email }) {
  return { type: GET_EMAIL, email };
}

function saveExpenditure(expenditure) {
  return { type: SAVE_EXPENDITURE, expenditure };
}

export function getCoin(currencies) {
  return async (dispatch) => {
    const exchangeRates = await currenciesApi();
    delete exchangeRates.USDT;
    dispatch(saveExpenditure({ ...currencies, exchangeRates }));
  };
}

function getCurrencies(json) {
  return { type: GET_CURRENCIES, currencies: json };
}

export function fetchCurrencies() {
  return async (dispatch) => {
    const currencies = await currenciesApi();
    delete currencies.USDT;
    const result = Object.values(currencies).map(({ code }) => code);
    dispatch(getCurrencies(result));
  };
}

export function changeEdit(editSet) {
  return { type: EDIT_CHANGE, editSet: !editSet };
}

export function setExpenseEdit(expenses, expenseEdit) {
  const oldExpenditure = expenses[expenseEdit.id];
  const newExpense = { ...oldExpenditure, ...expenseEdit };
  const newExpenses = expenses.map((el) => {
    if (el.id === newExpense.id) {
      return newExpense;
    }
    return el;
  });
  return { type: SET_EDIT_EXPENDITURE, currentExpenseEdit: newExpenses };
}

export function deleteExpenditure(expenses, { target: { dataset: { idexpenditure } } }) {
  const result = expenses.map((el) => el).filter((el) => el.id !== Number(idexpenditure));
  return {
    type: DELETE_EXPENSE,
    expenses: result };
}
