import { Types } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  expenseId: 0,
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case Types.SAVE_CURRENCIES:
    return { ...state, currencies: action.payload };
  case Types.ADD_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, { id: state.expenseId, ...action.payload }],
      expenseId: state.expenseId + 1,
    };
  default:
    return state;
  }
}

export default wallet;
