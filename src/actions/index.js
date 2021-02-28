// Coloque aqui suas actions
import coinApi, { convertCoin } from '../services/coinApi';

let id = 0;
let total = 0;

export const login = (email) => ({ type: 'LOGIN', email });
export const newExpense = (expense) => ({ type: 'ADD_EXPENSE', expense });
export const addTotal = (value) => ({ type: 'ADD_TOTAL', value });

export const addExpense = (expense) => async (dispatch) => {
  const exchangeRates = await coinApi();
  delete exchangeRates.USDT;
  expense = { id, ...expense, exchangeRates };
  id += 1;
  const convValue = convertCoin(expense.value, expense.currency, expense.exchangeRates);
  total += Number.parseFloat(convValue);
  dispatch(newExpense(expense));
  dispatch(addTotal(total));
};
