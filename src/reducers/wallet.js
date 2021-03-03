// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  obj: {},
  error: '',
  expense: [],
  id: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_CURRENCY':
    return {
      ...state,
      obj: action.obj,
    };
  default:
    return state;
  }
};

export default wallet;
