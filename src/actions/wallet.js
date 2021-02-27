import { createActions } from 'reduxsauce';
import getCoins from '../services';

export const { Types, Creators } = createActions({
  addExpense: ['expense'],
  removeExpense: ['id'],
  saveExpense: ['expense'],
  saveCurrencies: ['currencies'],
  editExpense: ['id'],
});

Creators.addExpenseWithCoins = (expense) => async (dispatch) => {
  const coins = await getCoins();
  dispatch(Creators.addExpense({ ...expense, exchangeRates: coins }));
};

Creators.fetchCurrencies = () => async (dispatch) => {
  const currencies = await getCoins();
  delete currencies.USDT;
  const currenciesCodes = Object.values(currencies).map(({ code }) => code);
  dispatch(Creators.saveCurrencies(currenciesCodes));
};
