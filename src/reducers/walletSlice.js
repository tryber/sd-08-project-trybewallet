import {
  RECEIVE_CURRENCIES,
  CHANGE_EXPENSE_FORM,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  IS_EDITING,
  FINISHES_EDIT,
} from '../actions/constants';

const initialState = {
  currencies: [],
  expenses: [],
  currentExpense: {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  },
  editing: false,
};

function handleEditCase(state) {
  return {
    ...state,
    expenses: [...state.expenses]
      .map((expense) => ((expense.id === state.currentExpense.id)
        ? { ...state.currentExpense } : expense)),
    editing: false,
    currentExpense: {
      ...state.currentExpense,
      id: state.currentExpense.id + 1,
    },
  };
}

export default function walletReducer(state = initialState, action) {
  switch (action.type) {
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      currencies: Object.entries(action.payload),
      currentExpense: {
        ...state.currentExpense,
        exchangeRates: action.payload,
      },
    };
  case CHANGE_EXPENSE_FORM:
    return {
      ...state,
      currentExpense: {
        ...state.currentExpense,
        [action.payload.key]: action.payload.input,
      },
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, { ...state.currentExpense }],
      currentExpense: {
        ...state.currentExpense,
        id: state.currentExpense.id + 1,
      },
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses].filter((expense) => expense.id !== action.payload),
    };
  case IS_EDITING:
    return {
      ...state,
      editing: true,
      currentExpense: {
        ...state.currentExpense,
        id: action.payload,
      },
    };
  case FINISHES_EDIT:
    return handleEditCase(state);
  default:
    return state;
  }
}
