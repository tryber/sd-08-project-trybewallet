import {
  CURRENCIES,
  EXPANSES,
  DELETE_EXPANSE,
  EDIT_EXPANSE_START,
  EDIT_EXPANSE_END,
} from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  isEditing: false,
};
export default function wallet(state = initialState, action) {
  switch (action.type) {
  case CURRENCIES:
    return { ...state, currencies: action.payload };
  case EXPANSES:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case DELETE_EXPANSE:
    return {
      ...state,
      expenses: state.expenses.filter(
        (expenses, index) => index !== action.payload,
      ),
    };
  case EDIT_EXPANSE_START:
    return { ...state, isEditing: true, expenseId: action.payload };
  case EDIT_EXPANSE_END:
    return {
      ...state,
      expenses: state.expenses.map((item) => {
        if (item.id === action.payload.id) return { ...item, ...action.payload };
        return item;
      }),
      isEditing: false,
    };
  default:
    return state;
  }
}
