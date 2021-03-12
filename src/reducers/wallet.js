// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  UPDATE_CURRENCIES,
  EDIT_EXPENSES,
  THIS_EDITING,
  ADD_EDICAO,
} from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
  editExpenses: {},
  isEditing: false,
  id: 0,
};
const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses, { ...action.payload,
          id: state.expenses.length,
          exchangeRates: state.currencies,
        },
      ],
    };
  case UPDATE_CURRENCIES:
    return { ...state, currencies: action.exchangeRates };
  case DELETE_EXPENSE:
    console.log({
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    });
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case THIS_EDITING:
    return (
      {
        ...state,
        isEditing: action.change,
      }
    );
  case ADD_EDICAO:
    return (
      { ...state,
        expenses: state.expenses.map((expense) => {
          if (expense.id === action.expense.id) {
            return action.expense;
          }
          return expense;
        }),
      }
    );
  case EDIT_EXPENSES:
    return (
      { ...state, expenses: action.expenses,
      }
    );
  default: return state;
  }
};

export default wallet;
