import api from '../services';

export const Types = {
  ADD_EXPENSE: 'ADD_EXPENSE',
  ADD_EXPENSE_WITH_COINS: 'ADD_EXPENSE_WITH_COINS',
  REMOVE_EXPENSE: 'REMOVE_EXPENSE',
  EDIT_EXPENSE: 'EDIT_EXPENSE',
  SAVE_EXPENSE: 'SAVE_EXPENSE',
};

export const Creators = {
  addExpense: (expense) => ({
    type: Types.ADD_EXPENSE,
    payload: expense,
  }),
  addExpenseWithCoins: (expense) => async (dispatch) => {
    const coins = await api.getCoins();
    dispatch(Creators.addExpense({ ...expense, exchangeRates: coins }));
  },
  removeExpense: (id) => ({
    type: Types.REMOVE_EXPENSE,
    id,
  }),
  editExpense: (id) => ({
    type: Types.EDIT_EXPENSE,
    id,
  }),
  saveExpense: (expense) => ({
    type: Types.SAVE_EXPENSE,
    payload: expense,
  }),
};
