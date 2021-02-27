const INITIAL_STATE = {
  currencies: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SAVE_CURRENCIES':
    return { ...state, currencies: Object.entries(action.currencies) };
  default:
    return state;
  }
}

export default wallet;
