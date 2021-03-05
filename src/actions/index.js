import getQuotations from '../services/getQuotations';

export const Types = {
  SAVE_EMAIL: 'SAVE_EMAIL',
  SAVE_CURRENCIES: 'SAVE_CURRENCIES',
  ADD_EXPENSE: 'ADD_EXPENSE',
  REMOVE_EXPENSE: 'REMOVE_EXPENSE',
  EDIT_EXPENSE: 'EDIT_EXPENSE',
  SET_EDIT: 'SET_EDIT',
};

export const Creators = {
  saveEmail: (email) => ({
    type: Types.SAVE_EMAIL,
    payload: email,
  }),
  saveCurrencies: (data) => ({
    type: Types.SAVE_CURRENCIES,
    payload: data,
  }),
  addExpense: (expense) => ({
    type: Types.ADD_EXPENSE,
    payload: expense,
  }),
  removeExpense: (id) => ({
    type: Types.REMOVE_EXPENSE,
    payload: id,
  }),
  editExpense: (submittedData) => ({
    type: Types.EDIT_EXPENSE,
    payload: submittedData,
  }),
  setIsEditing: (status, id) => ({
    type: Types.SET_EDIT,
    payload: { status, id },
  }),
  fetchCurrencies: () => async (dispatch) => {
    const data = await getQuotations();
    delete data.USDT;
    dispatch(Creators.saveCurrencies(Object.keys(data)));
  },
  fetchQuotation: (submittedData) => async (dispatch) => {
    const fetchedData = await getQuotations();
    delete fetchedData.USDT;
    dispatch(Creators.addExpense({ ...submittedData, exchangeRates: fetchedData }));
  },
};
