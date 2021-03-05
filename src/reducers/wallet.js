import {
  GET_CURRENCY,
  EXPENSES_FORM,
  FINISH_EDIT,
  ADD_EXPENSES,
  DELETE_EXPENSES,
  EDIT,
} from '../actions/types';

const initialState = {
  currencies: [],
  expenses: [],
  newExpenses: {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  },
  edit: false,
};

function handleEdit(state, payload) {
  const editExpenses = [...state.expenses].find((e) => e.id === payload);
  return {
    ...state,
    edit: true,
    newExpenses: {
      ...state.newExpenses,
      id: payload,
      exchangeRates: editExpenses.exchangeRates,
      currency: editExpenses.currency,
    },
  };
}

function handleFinishEdit(state) {
  return {
    ...state,
    expenses: [...state.expenses].map((e) => {
      const mapExpense = e.id === state.newExpenses.id;
      return mapExpense ? { ...state.newExpenses } : e;
    }),
    edit: false,
    newExpenses: {
      ...state.newExpenses,
      id: state.newExpenses.id + 1,
    },
  };
}

export default function walletReducer(state = initialState, action) {
  switch (action.type) {
  case GET_CURRENCY:
    return {
      ...state,
      currencies: Object.keys(action.payload),
      newExpenses: {
        ...state.newExpenses,
        exchangeRates: action.payload,
      },
    };
  case EXPENSES_FORM:
    return {
      ...state,
      newExpenses: {
        ...state.newExpenses,
        [action.payload.key]: action.payload.input,
      },
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, { ...state.newExpenses }],
      newExpenses: {
        ...state.newExpenses,
        id: state.newExpenses.id + 1,
      },
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses].filter((e) => e.id !== action.payload),
    };
  case EDIT:
    return handleEdit(state, action.payload);
  case FINISH_EDIT:
    return handleFinishEdit(state);
  default:
    return state;
  }
}
