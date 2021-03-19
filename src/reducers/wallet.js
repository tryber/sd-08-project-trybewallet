// import {  } from '../actions.';

const INIT_STATE = {
  expenses: [],
  amount: 0,
  exchange: [],
  idEditing: '',
  editing: false,
};

const wallet = (state = INIT_STATE, action) => {
  switch (action.type) {
  case 'ADD_DESPESAS':
    return { ...state, expenses: [...state.expenses, action.expenses] };
  case 'TOTAL_AMOUNT':
    return { ...state, amount: action.amount };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses.filter(({ id }) => id !== action.id)],
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      editing: true,
      idEditing: action.id,
    };
  case 'SAVE_EDIT':
    return {
      ...state,
      editing: false,
      idEditing: '',
      expenses: state.expenses.map((data) => {
        console.log(action.newObject);
        if (data.id === action.newObject.id) {
          return action.newObject;
        }
        return data;
      }),
    };
  default:
    return state;
  }
};

export default wallet;
