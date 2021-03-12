export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_PASSWORD = 'SAVE_PASSWORD';
export const TOTAL_EXPENSE = 'TOTAL_EXPENSE';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const savePassword = (password) => ({
  type: SAVE_PASSWORD,
  password,
});

export const totalExpense = (totalValue) => ({
  type: TOTAL_EXPENSE,
  totalValue,
});
