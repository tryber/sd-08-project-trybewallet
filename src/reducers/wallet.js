// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { Types } from '../actions/wallet';

const INITIAL_STATE = {
  expenses: [],
  idCounter: 0,
  editor: false,
  idToEdit: null,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case Types.ADD_EXPENSE: {
    const newExpense = {
      ...action.payload,
      id: state.idCounter,
    };
    return {
      ...state,
      expenses: [...state.expenses, newExpense],
      idCounter: state.idCounter + 1,
    };
  }

  case Types.REMOVE_EXPENSE: {
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  }

  case Types.EDIT_EXPENSE: {
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  }

  case Types.SAVE_EXPENSE: {
    console.log('saving', action.payload);
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return { ...expense, ...action.payload };
        }
        return expense;
      }),
      editor: false,
      idToEdit: null,
    };
  }

  default: return state;
  }
}
