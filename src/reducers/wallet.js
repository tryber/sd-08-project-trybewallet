const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  exchange: [],
  errors: [],
  isFetching: false,
  isEditing: false,
  selectedExpense: {},
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.expenses] };
  case 'UPDATE_EXCHANGE':
    return { ...state, currencies: action.currencies, exchange: action.exchanges };
  case 'FAILED_REQUEST':
    return { ...state, errors: action.errors, isFetching: false };
  case 'RECEIVE_EXCHANGE_VALUE':
    return { ...state, exchange: action.receiveExchange };
  case 'DELETE_EXPENSE':
    return { ...state, expenses: action.expenses };
  case 'IS_EDITING':
    return { ...state, isEditing: true, selectedExpense: action.selectedExpense };
  case 'EDIT_EXPENSE':
    return { ...state, isEditing: false, expenses: action.expenses };
  default:
    return state;
  }
}
export default walletReducer;
