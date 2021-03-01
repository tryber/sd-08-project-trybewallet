import { ADD_EXPENSE, REMOVE_EXPENSE, UPDATE_CURRENCIES } from '../consts';

const initialState = {
  currencies: [],
  expenses: [],
};

const wallet = (state = initialState, { type, payload }) => {
  const newState = { ...state };
  let newExpenses = [];
  if (payload && payload.id) {
    newExpenses = newState.expenses.filter(({ id }) => id !== payload.id)
      .map((expense, index) => ({ ...expense, ...{ id: index } }));
  }

  switch (type) {
  case ADD_EXPENSE:
    newState.expenses.push(payload);
    return { ...newState };
  case REMOVE_EXPENSE:
    return { ...newState, ...{ expenses: newExpenses } };
  case UPDATE_CURRENCIES:
    return { ...state, ...payload };
  default:
    return state;
  }
};

export default wallet;
