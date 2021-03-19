const INITIAL_STATE = {
  total: 0,
  expenses: [],
  edit: false,
  idEdit: '',
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.expense] };
  case 'TOTAL_VALUE':
    return { ...state, total: action.value };
  case 'DEL_EXPENSE':
    return { ...state, expenses: [...state.expenses.filter(({ id }) => id !== action.id)],
    };
  case 'EDIT_VALUE':
    return { ...state, edit: true, idEdit: action.id };
  case 'SAVE_EDIT':
    return { ...state,
      edit: false,
      idEdit: '',
      expenses: state.expenses.map((obj) => {
        if (obj.id === action.newObject.id) {
          return action.newObject;
        } return obj;
      }),
    };
  default:
    return state;
  }
}
