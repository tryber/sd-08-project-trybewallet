// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  IS_FETCHING,
  REQUEST_CURRENCY,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SUBMIT_EDIT,
} from '../common/ActionTypes';

const initialValues = {
  value: '0',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  id: 0,
};

const initialState = {
  initValues: { ...initialValues },
  currencies: [],
  isFetch: false,
  expenses: [],
  editExpense: {},
  isEdit: false,
};

export default function wallet(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
  case REQUEST_CURRENCY:
    return {
      ...state,
      currencies: [...Object.keys(payload)],
      isFetch: false,
    };
  case IS_FETCHING:
    return {
      ...state,
      isFetch: true,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== payload)],
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      isEdit: true,
      initValues: { ...payload },
    };
  case SUBMIT_EDIT:
    return {
      ...state,
      expenses: state.expenses.map((item) => {
        if (item.id === payload.id) return { ...item, ...payload };
        return item;
      }),
      initValues: { ...initialValues },
      isEdit: false,
    };
  default:
    return state;
  }
}
