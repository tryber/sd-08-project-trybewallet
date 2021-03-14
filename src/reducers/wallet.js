// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  id: 0,
  editorMode: false,
  idToEdit: null,
};

const one = 1;

const wallet = (state = INITIAL_STATE, action) => {
  const newExpense = {
    id: state.id,
    ...action.expenses,
  };
  switch (action.type) {
  case 'SAVE_CURRENCY': return { ...state, currencies: action.currencies };
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, newExpense],
      id: state.id + one,
    };
  case 'REMOVE':
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      editorMode: true,
      idToEdit: action.idToEdit,
    };
  case 'SAVE_EDITED_EXPENSE':
    return {
      ...state,
      editorMode: false,
      idToEdit: null,
      expenses: state.expenses.map((expense) => {
        if (expense.id === state.idToEdit) {
          return {
            ...expense,
            ...action.payload,
          };
        }
        return expense;
      }),
    };
  default: return state;
  }
};

export default wallet;
