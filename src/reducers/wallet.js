const INITIAL_STATE = {
  IDediting: '',
  isEditing: false,
  total: 0,
  expenses: [],
  auxiliar: {
    arrFinal: ['USD', 'ADS'],
    arrDeValores: [1, 1, 1],
    valor: 0,
  },
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_DESPESA':
    return { ...state, expenses: [...state.expenses, action.expenses] };
  case 'ADD_AUXILIAR':
    return { ...state, auxiliar: action.auxiliar };
  case 'CHANGE_TOTAL':
    return { ...state, total: action.total };
  case 'EDIT_EXPENSES':
    return { ...state, isEditing: true, IDediting: action.id };
  case 'SAVE_EDIT':
    return { ...state,
      isEditing: false,
      IDediting: '',
      expenses:
  state.expenses.map((obj) => {
    if (obj.id === action.newObj.id) {
      return action.newObj;
    }
    return obj;
  }) };
  case 'DELETE_EXPENSES':
    return {
      ...state,
      expenses: [
        ...state.expenses
          .filter(({ id }) => id !== action.id),
      ],
    };
    // esse case foi adaptado a partir da criação de Ana Karine.
    // https://github.com/tryber/sd-08-project-trybewallet/blob/579ea98be56e308130fb95770839b3a0dffdcc3e/src/reducers/wallet.js
  default:
    return state;
  }
}
