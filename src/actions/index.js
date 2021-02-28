const LOGIN = 'LOGIN';
const CURRENCY = 'CURRENCY';
const EXPENSES = 'EXPENSES';

export const loginAction = (email) => ({ type: LOGIN, email });
export const currenciesAction = (value) => ({ type: CURRENCY, currencies: value });
export const expensesAction = (value) => ({ type: EXPENSES, expenses: value });
