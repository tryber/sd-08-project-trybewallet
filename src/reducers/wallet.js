// import {  } from '../actions.';

const INIT_STATE = {
  expenses: [],
  amount: 0,
  exchange: [],
};

const wallet = (state = INIT_STATE, action) => {
  switch (action.type) {
  case 'ADD_DESPESAS':
    return { ...state, expenses: [...state.expenses, action.expenses] };
  case 'TOTAL_AMOUNT':
    return { ...state, amount: action.amount };
  case 'DELETE_EXPENSE':
    return { ...state,
      expenses: [...state.expenses
        .filter(({ id }) => id !== action.id)] };
  default:
    return state;
  }
};

export default wallet;
