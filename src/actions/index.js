// Coloque aqui suas actions
import getCurrencies from '../services/index';

export const LOGIN = 'LOGIN';

export const login = (email) => ({ type: LOGIN, email });

export const saveCurrencies = (currencies) => ({
  type: 'SAVE_CURRENCY',
  currencies,
});

export const getRequest = () => async (dispatch) => {
  const currencies = await getCurrencies();
  const codes = Object.values(currencies).filter((name) => name.name !== 'Dólar Turismo')
    .map((code) => code.code);
  dispatch(saveCurrencies(codes));
};

const addExpenses = (expenses) => ({ type: 'ADD_EXPENSE', expenses });

export const addExpenseWithRates = (expense) => async (dispatch) => {
  const currentCurrency = await getCurrencies();
  const expensesWithCurrency = {
    ...expense, exchangeRates: currentCurrency };
  dispatch(addExpenses(expensesWithCurrency));
};

export const removeExpenses = (id) => ({
  type: 'REMOVE',
  id,
});

export const editExpense = (idToEdit) => ({
  type: 'EDIT_EXPENSE',
  idToEdit,
});

export const saveExpense = (expense) => ({
  type: 'SAVE_EDITED_EXPENSE',
  payload: expense,
});
