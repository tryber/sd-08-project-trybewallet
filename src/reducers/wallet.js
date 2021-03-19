// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: [],
  total: 0,
  edit: false,
  idEdit: '',
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_DESPESA':
    return { ...state, expenses: [...state.expenses, action.despesa] };
  case 'ADD_DESPESATOTAL':
    return { ...state, total: action.despesa };
  case 'DEL_DESPESA':
    return { ...state,
      expenses: [...state.expenses.filter(({ id }) => id !== action.id),
      ],
    };
  case 'EDIT_DESPESA':
    return { ...state, edit: true, idEdit: action.id };
  case 'SAVE_EDIT':
    return { ...state,
      edit: false,
      idEdit: '',
      expenses: state.expenses.map((obj) => {
        if (obj.id === action.newObject.id) {
          return action.newObject;
        }
        return obj;
      }) };
  default:
    return state;
  }
}
