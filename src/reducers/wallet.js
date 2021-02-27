import { ADDEXPENSE } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = initialState, action) {
  switch (action.type) {
  case ADDEXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          ...action.objectExpense,
          id: state.expenses.length,
        },
      ],
    };
  default:
    return state;
  }
}
