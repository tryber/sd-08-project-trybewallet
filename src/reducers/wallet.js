import { ADD_EXPENSE, REMOVE_EXPENSE, UPDATE_CURRENCIES } from '../consts';

const initialState = {
  currencies: [],
  expenses: [],
};

const wallet = (state = initialState, { type, payload }) => {
  const newExpenses = () => state.expenses.filter(({ id }) => id !== payload.id);
  // .map((expense, index) => ({ ...expense, ...{ id: index } }));

  switch (type) {
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, payload] };
  case REMOVE_EXPENSE:
    return { ...state, expenses: newExpenses() };
  case UPDATE_CURRENCIES:
    return { ...state, ...payload };
  default:
    return state;
  }
};

export default wallet;
