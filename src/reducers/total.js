const INITIAL_STATE = {
  amount: 0,
};

function totalReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_TOTAL':
    return { amount: action.value };
  default:
    return state;
  }
}

export default totalReducer;
