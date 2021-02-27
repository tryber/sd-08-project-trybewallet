// Coloque aqui suas actions
// export const LOGIN = 'LOGIN';
export const EMAIL = 'EMAIL';
export const PASS = 'PASS';

export const emailAction = (value) => ({ type: EMAIL, value });
export const passwordAction = (value) => ({ type: PASS, value });

// export const loginAction = (value) => ({ type: LOGIN, value });

export const EXPENSES = 'EXPENSES';

export const expensesAction = (value) => ({ type: EXPENSES, value });
