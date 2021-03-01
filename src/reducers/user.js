const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: []
  }
}

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_LOGIN':
      return {
        ...state,
        user: {
          email: action.payload.email,
        }
      };
    default:
      return state;
  }
}

export default user;
