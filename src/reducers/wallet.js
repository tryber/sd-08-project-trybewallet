const INITIAL_STATE = {
  isFetching: false,
  currencies: [],
  expenses: [],
  currency: [],
  error: '',
  isEditable: false,
  idEditable: '',
};

export default function requestAPIReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GET_EXPENSES':
    return { ...state, expenses: [...state.expenses, action.payload] };
  case 'REQUEST_CURRENCIES':
    return { ...state, isFetching: true };
  case 'GET_CURRENCIES':
    return { ...state, currencies: action.payload, isFetching: false };
  case 'GET_CURRENCY':
    return { ...state, currency: [...state.currency, action.payload], isFetching: false };
  case 'DELETE_EXPENSES': {
    const idDelete = action.payload;
    return {
      ...state,
      expenses:
      [...state.expenses.filter(({ id }) => id !== idDelete)],
    };
  }
  case 'EDIT_EXPENSE': {
    return { ...state, isEditable: true, idEditable: action.payload };
  }
  case 'EDIT_EXPENSE_END':
    return {
      ...state,
      expenses: state.expenses.map((item) => {
        if (item.id === action.expense.id) return { ...item, ...action.expense };
        return item;
      }),
      isEditable: false,
    };
  default:
    return state;
  }
}
