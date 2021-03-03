import {
  GET_CURRENCIES,
  SAVE_EXPENDITURE,
  DELETE_EXPENSE,
  EDIT_CHANGE,
  SET_EDIT_EXPENDITURE,
} from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  isCurrency: 'BRL',
  editSet: false,
  currentExpenseEdit: {},
};

function reducerGetCurrencies(state = initialState, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, currencies: action.currencies };
  default:
    return state;
  }
}

function reducerSaveExpenditure(state = initialState, action) {
  switch (action.type) {
  case SAVE_EXPENDITURE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenditure] };
  default:
    return state;
  }
}

function reducerDelete(state = initialState, action) {
  switch (action.type) {
  case DELETE_EXPENSE:
    return { ...state, expenses: action.expenses };
  default:
    return state;
  }
}

function reducerChangeEdit(state = initialState, action) {
  switch (action.type) {
  case EDIT_CHANGE:
    return { ...state, editSet: action.editSet };
  default:
    return state;
  }
}

function reducerSetEdit(state = initialState, action) {
  switch (action.type) {
  case SET_EDIT_EXPENDITURE:
    return { ...state, expenses: action.currentExpenseEdit };
  default:
    return state;
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return reducerGetCurrencies(state, action);
  case SAVE_EXPENDITURE:
    return reducerSaveExpenditure(state, action);
  case DELETE_EXPENSE:
    return reducerDelete(state, action);
  case EDIT_CHANGE:
    return reducerChangeEdit(state, action);
  case SET_EDIT_EXPENDITURE:
    return reducerSetEdit(state, action);
  default:
    return state;
  }
}

export default reducer;
